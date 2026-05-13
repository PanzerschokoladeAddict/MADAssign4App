import {
    addDoc,
    collection,
    getDocs,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function saveTeamData(
  teamName: string,
  teamLeader: string,
  teamCode: string,
) {
  return addDoc(collection(db, "teams"), {
    teamName,
    teamLeader,
    teamCode,
    createdAt: serverTimestamp(),
  });
}

export async function saveResultsData(
  teamName: string,
  activityType: string,
  data: object,
) {
  return addDoc(collection(db, "results"), {
    teamName,
    activityType,
    data,
    createdAt: serverTimestamp(),
  });
}

export async function getTeams() {
  const q = query(collection(db, "teams"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getResults() {
  const q = query(collection(db, "results"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
