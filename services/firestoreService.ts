import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export async function saveUserLocation(latitude: number, longitude: number) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    uid: user.uid,
    email: user.email || "Anonymous",
    lastLocation: {
      latitude,
      longitude,
      timestamp: serverTimestamp(),
    },
    updatedAt: serverTimestamp(),
  }, { merge: true });
  return userRef;  
}

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
  teamLeader?: string,
  langitude?: number,
  longitude?: number,
) {
  return addDoc(collection(db, "results"), {
    teamName,
    teamLeader: teamLeader ?? "",
    activityType,
    data,
    langitude: langitude ?? 0,
    longitude: longitude ?? 0,
    createdAt: serverTimestamp(),
  });
}

export async function getTeamName(): Promise<string> {
  const name = await AsyncStorage.getItem("teamName");
  return name ?? "Unknown Team";
}

export async function getTeamLeader(): Promise<string> {
  const leader = await AsyncStorage.getItem("teamLeader");
  return leader ?? "Unknown Leader";
}

export async function getTeamCode(): Promise<string> {
  const code = await AsyncStorage.getItem("teamCode");
  return code ?? "Unknown Code";
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
