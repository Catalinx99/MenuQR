const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const app = express();

const stripe = Stripe(
  "sk_test_51PoJ5zDRjIy3cOKHgpT2xskOtxrgmM0UpzAB3y42qDtZYTdjizCPexJesgMH5yvJUFcZJCsF2EYVnKwVTIDFStGA0030aHp0Vb"
);

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "ron",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/menulist",
  });

  res.json({ url: session.url });
});

app.listen(4242, () => console.log("Server running on port 4242"));
