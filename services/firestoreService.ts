import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function saveTeamData(
  teamName: string,
  teamLeader: string,
  teamCode: string,
) {
  const docRef = await addDoc(collection(db, "teams"), {
    teamName,
    teamLeader,
    teamCode,
    team_id: "",
    createdAt: serverTimestamp(),
  });
  await updateDoc(docRef, { team_id: docRef.id });
  return docRef;
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

export async function getTeamName(): Promise<string> {
  const name = await AsyncStorage.getItem("teamName");
  return name ?? "Unknown Team";
}

export async function getTeams() {
  const q = query(collection(db, "teams"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getResults() {
  const q = query(collection(db, "results"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
