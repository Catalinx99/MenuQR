import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import { auth } from "./firebaseConfig.ts";

const stripe = new Stripe(
  "sk_test_51PoJ5zDRjIy3cOKHgpT2xskOtxrgmM0UpzAB3y42qDtZYTdjizCPexJesgMH5yvJUFcZJCsF2EYVnKwVTIDFStGA0030aHp0Vb",
  {
    apiVersion: "2023-08-16",
  }
);

admin.initializeApp();

export const createCheckoutSession = functions.https.onCall(
  async (data, context) => {
    // Verificăm dacă utilizatorul este autentificat

    const user = auth.currentUser;

    if (!auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated"
      );
    }

    const uid = user.uid; // Aici accesezi UID-ul utilizatorului autenticat

    const priceId = data.priceId;
    if (!priceId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Price ID is required"
      );
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: "https://menuqr-app.web.app/payment-success",
        cancel_url: "https://menuqr-app.web.app/payment-cancel",
        metadata: { uid },
      });

      return { url: session.url };
    } catch (error) {
      console.error("Stripe session creation failed:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to create checkout session"
      );
    }
  }
);
