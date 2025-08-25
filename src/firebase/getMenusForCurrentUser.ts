import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig.ts";

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
}
export const getMenusForCurrentUser = async (user: any): Promise<Menu[]> => {
  if (!user) throw new Error("Nu ești autentificat.");

  const userMenusRef = collection(db, "users", user.uid, "menus");
  const snapshot = await getDocs(userMenusRef);

  const menus: Menu[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Menu[];

  return menus;
};
