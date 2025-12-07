import { validateSymbol } from "utils";

describe("symbolUtils", () => {
  describe("validateSymbol", () => {
    it("should return false if empty string is sent", () => {
      expect(validateSymbol("")).toBe(false);
    });

    it("should return false if short string is sent", () => {
      expect(validateSymbol("bi")).toBe(false);
    });

    it("should return false if long string is sent", () => {
      expect(validateSymbol("bibib")).toBe(false);
    });

    it("should return false if string with numbers is sent", () => {
      expect(validateSymbol("b1b")).toBe(false);
    });

    it("should return false if string with special symbol is sent", () => {
      expect(validateSymbol("b$b")).toBe(false);
    });

    it("should return true if string with three letters is sent", () => {
      expect(validateSymbol("bib")).toBe(true);
    });
  });
});
