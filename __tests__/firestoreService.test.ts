// __tests__/firestoreService.test.ts
// Integration test


import { getResults, getTeamName } from "../services/firestoreService";

jest.mock("../services/firebaseConfig", () => ({
    db: {},
    auth: { currentUser: { uid: "testUserId", email: null } },
}));

jest.mock("firebase/firestore", () => ({
    addDoc: jest.fn().mockResolvedValue({ id: "testDocId" }),
    collection: jest.fn(),
    getDocs: jest.fn().mockResolvedValue({ docs: [
            {
            id: 1,
            data: () => ({
                teamName: "testTeamName",
                teamLeader: "testTeamLeader",
                teamCode: "testTeamCode",
                team_id: "testTeamId",
                createdAt: "testCreatedAt"
            }),
            },
        ]}),
    query: jest.fn(),
    orderBy: jest.fn(),
    serverTimestamp: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn().mockResolvedValue("testTeamId"),
    setItem: jest.fn(),
}));

describe("firestoreService integration tests", () => {
  test("getTeamName returns team name from AsyncStorage", async () => {
    const name = await getTeamName();
    expect(name).toBe("testTeamId");
  });

  test("getResults returns an array of results", async () => {
    const results = await getResults();
    expect(Array.isArray(results)).toBe(true);
  });

  test("getResults returns correct teamName", async () => {
    const results = await getResults();
    expect(results[0].teamName).toBe("testTeamName");
  });
});