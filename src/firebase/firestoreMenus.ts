import { collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebaseConfig.ts";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}
interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}
interface Menu {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  categories: Category[];
  imageUrl?: string;
  templateType?: string;
}
// Salvează un meniu pentru userul logat
export const saveMenuForCurrentUser = async (menu: Menu) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Nu ești autentificat");
  console.log(user, auth, menu, "user");

  const userMenusRef = collection(db, "users", user.uid, "menus");
  const menuRef = doc(userMenusRef, menu.id);
  await setDoc(menuRef, menu);
};
