import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.ts";

export const deleteMenu = async (userId: string, menuId: string) => {
  const menuRef = doc(db, "users", userId, "menus", menuId);
  await deleteDoc(menuRef);
};
