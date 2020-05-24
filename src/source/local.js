import localforage from "localforage";

export default function AddItemtoDB(key, item) {
  //   Randomising last seconds to avoid collision
  key += Math.floor(Math.random() * 9999);
  item.epochTime = key;
  localforage.setItem(key.toString(), item);
}
