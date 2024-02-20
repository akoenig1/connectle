import { 
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { database } from "./config";

const dbInstance = collection(database, 'connectle');

export async function addGame(data) {
  let result, error;

  result = await addDoc(dbInstance, data)
    .catch(error => error);

  if (error) console.error(error);
  return result;
}

export async function updateGame(slug, data) {
  await setDoc(doc(database, "connectle", slug), data);
}

export async function getDataFromSlug(slug) {
  const ref = doc(database, "connectle", slug).withConverter(dataConverter);
  const document = await getDoc(ref);
  const data = document.data();

  if (data) {
      return { result: data, error: "" };
  } else {
      return { result: null, error: "Error." };
  }
}

const dataConverter = {
  toFirestore: (data) => {
    return {
      categories: data.categories,
      title: data.title,
      author: data.author
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return { 
      categories: data.categories, 
      title: data.title, 
      author: data.author 
    };
  }
};
