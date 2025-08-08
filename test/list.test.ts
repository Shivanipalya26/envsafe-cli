import { describe, it, expect } from "vitest";
import { testEnvKeys } from "../src/command/list";

describe("listEnvKeys", () => {
  it("lists keys from a .env file", () => {
    const result = testEnvKeys({ file: ".env.example", withValues: false });
    expect(Array.isArray(result)).toBe(true);
  });
});
