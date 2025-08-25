import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.ts";

export const getMenuById = async (menuId: string) => {
  const docRef = doc(db, "publicMenus", menuId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() };
};

export const saveMenuToPublic = async (menu: any) => {
  if (!menu?.id) throw new Error("Menu must have an ID");

  await setDoc(doc(db, "publicMenus", menu.id), menu);
};

export const unpublishMenu = async (menu: any) => {
  if (!menu?.id) throw new Error("Menu must have an ID");
  await deleteDoc(doc(db, "publicMenus", menu.id));
};
