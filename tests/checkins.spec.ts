import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckinsRepository } from "../src/repository/inMemoryRepository/inMemoryCheckinsRepository";
import { CheckinUserService } from "../src/services/checkinUserService";
import { randomUUID } from "node:crypto";

let checkinsInMemoryRepository: InMemoryCheckinsRepository;
let checkinsServices: CheckinUserService;

describe("Check-in use case", () => {
  beforeEach(() => {
    checkinsInMemoryRepository = new InMemoryCheckinsRepository();
    checkinsServices = new CheckinUserService(checkinsInMemoryRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    const checkin = await checkinsServices.CreateCheckinUser({
      id_gym: randomUUID(),
      id_user: randomUUID(),
    });

    expect(checkin.id_checkin).toEqual(expect.any(String));
  });

  it("should be able to check in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));
    
    const checkin = await checkinsServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: "user-01",
    });

    vi.setSystemTime(new Date(2023, 1, 1, 8, 0, 0));

    const newCheckin = await checkinsServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: "user-01",
    });

    expect(checkin.id_checkin).toEqual(expect.any(String))
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));
    
    const checkin = await checkinsServices.CreateCheckinUser({
      id_gym: randomUUID(),
      id_user: randomUUID(),
    });

    await expect(() =>
      checkinsServices.CreateCheckinUser({
        id_gym: randomUUID(),
        id_user: checkin.id_user,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
