// __tests__/saveAndRetrieve.test.ts
// E2E test

import { getResults, saveResultsData } from "../services/firestoreService";

jest.mock("../services/firebaseConfig", () => ({
  db: {},
  auth: { currentUser: { uid: "testUserId", email: null } },
}));

const mockStore: any[] = [];

jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn().mockImplementation((_col, data) => {
    mockStore.push({ id: "mock-" + mockStore.length, ...data });
    return Promise.resolve({ id: "mock-" + (mockStore.length - 1) });
  }),
  collection: jest.fn(),
  getDocs: jest.fn().mockImplementation(() =>
    Promise.resolve({
      docs: mockStore.map((d) => ({ id: d.id, data: () => d })),
    })
  ),
  query: jest.fn(),
  orderBy: jest.fn(),
  serverTimestamp: jest.fn(() => "mock-timestamp"),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn().mockResolvedValue("Test Team"),
  setItem: jest.fn(),
}));

describe("E2E: save and retrieve result", () => {
  test("saves a sound result then retrieves it", async () => {
    // Step 1 — save
    await saveResultsData("Test Team", "sound", {
      loudestDb: 85,
      loudestAction: "Action 1 - Drop an Item",
    });

    // Step 2 — retrieve
    const results = await getResults();

    // Step 3 — verify
    expect(results.length).toBeGreaterThan(0);
    expect((results[0] as any).teamName).toBe("Test Team");
    expect((results[0] as any).activityType).toBe("sound");
  });

  test("saved result contains correct data", async () => {
    const results = await getResults();
    const soundResult = results.find((r: any) => r.activityType === "sound");
    expect(soundResult).toBeDefined();
    expect((soundResult as any).data.loudestDb).toBe(85);
  });
});