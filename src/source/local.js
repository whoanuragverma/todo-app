import localforage from "localforage";

export default function AddItemtoDB(key, item) {
  if (localforage.getItem(key)) key += Math.floor(Math.random() * 999);
  localforage.setItem(key.toString(), item);
}
