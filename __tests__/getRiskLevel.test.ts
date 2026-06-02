// __tests__/getRiskLevel.test.ts
// Unit test 

function getRiskLevel(db: number): { label: string; color: string } {
  if (db < 30) return { label: "No risk", color: "#4c8f3f" };
  if (db < 60) return { label: "Safe for long periods", color: "#4c8f3f" };
  if (db < 85)
    return { label: "Generally safe, fatigue possible", color: "#e8a838" };
  if (db < 90) return { label: "Hearing damage possible", color: "#e67e22" };
  if (db < 100) return { label: "Hearing damage likely", color: "#e67e22" };
  if (db < 110) return { label: "Serious damage in minutes", color: "#e74c3c" };
  if (db < 120)
    return { label: "Painful, immediate damage possible", color: "#e74c3c" };
  if (db < 130)
    return { label: "Immediate and severe damage", color: "#c0392b" };
  return { label: "Instant permanent damage", color: "#c0392b" };
}

describe("getRiskLevel", () => {
    test("returns No risk for dB < 30", () => {
        expect(getRiskLevel(20)).toEqual({ label: "No risk", color: "#4c8f3f" });
    });
    test("returns Safe for long periods for 30 <= dB < 60", () => {
        expect(getRiskLevel(45)).toEqual({ label: "Safe for long periods", color: "#4c8f3f" });
    });
    test("returns Generally safe, fatigue possible for 60 <= dB < 85", () => {
        expect(getRiskLevel(70)).toEqual({ label: "Generally safe, fatigue possible", color: "#e8a838" });
    });
    test("returns Hearing damage possible for 85 <= dB < 90", () => {
        expect(getRiskLevel(88)).toEqual({ label: "Hearing damage possible", color: "#e67e22" });
    });
    test("returns Hearing damage likely for 90 <= dB < 100", () => {
        expect(getRiskLevel(95)).toEqual({ label: "Hearing damage likely", color: "#e67e22" });
    });
    test("returns Serious damage in minutes for 100 <= dB < 110", () => {
        expect(getRiskLevel(105)).toEqual({ label: "Serious damage in minutes", color: "#e74c3c" });
    });
    test("returns Painful, immediate damage possible for 110 <= dB < 120", () => {
        expect(getRiskLevel(115)).toEqual({ label: "Painful, immediate damage possible", color: "#e74c3c" });
    });
    test("returns Immediate and severe damage for 120 <= dB < 130", () => {
        expect(getRiskLevel(125)).toEqual({ label: "Immediate and severe damage", color: "#c0392b" });
    });
    test("returns Instant permanent damage for dB >= 130", () => {
        expect(getRiskLevel(130)).toEqual({ label: "Instant permanent damage", color: "#c0392b" });
    });
});