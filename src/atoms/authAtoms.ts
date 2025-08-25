import { atom } from "jotai";

// Citire inițială din localStorage
const storedAuth = localStorage.getItem("accessToken");
const initialAuth = !!storedAuth;

export const isAuthenticatedAtom = atom(initialAuth);
export const userAtom = atom(null);
