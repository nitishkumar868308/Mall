import { describe, expect, it } from "vitest";
import { filterVenuesByCapacity } from "./venue-filter";
import { VENUES } from "./data/venues";

describe("filterVenuesByCapacity", () => {
  it("returns venues whose capacity range contains the attendee count", () => {
    const result = filterVenuesByCapacity(VENUES, 4000);
    const names = result.map((v) => v.name);
    expect(names).toContain("The Plaza");
    expect(names).toContain("Expo Hall");
    expect(names).not.toContain("The Rink");
  });

  it("returns the smallest venue when attendee count is below all minimums", () => {
    const result = filterVenuesByCapacity(VENUES, 50);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("The Rink");
  });

  it("returns the largest venue when attendee count is above all maximums", () => {
    const result = filterVenuesByCapacity(VENUES, 50000);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Festival Grounds");
  });

  it("orders matches by closeness to the midpoint of each venue's range", () => {
    const result = filterVenuesByCapacity(VENUES, 4500);
    expect(result[0]?.name).toBe("The Plaza");
  });
});
