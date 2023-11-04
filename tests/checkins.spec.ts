import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckinsRepository } from "../src/repository/inMemoryRepository/inMemoryCheckinsRepository";
import { InMemoryGymsRepository } from "../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { CheckinUserService } from "../src/services/checkinUserService";

let checkinsInMemoryRepository: InMemoryCheckinsRepository;
let gymsInMemoryRepository: InMemoryGymsRepository;
let checkinsServices: CheckinUserService;

describe("Check-in use case", () => {
  beforeEach(() => {
    checkinsInMemoryRepository = new InMemoryCheckinsRepository();
    gymsInMemoryRepository = new InMemoryGymsRepository();

    checkinsServices = new CheckinUserService(
      checkinsInMemoryRepository,
      gymsInMemoryRepository
    );

    gymsInMemoryRepository.items.push({
      id_gym: "gym-01",
      gym_name: "Ignite Gym",
      phone: "",
      description: "",
      latitude: new Decimal(-1.403582),
      longitude: new Decimal(-48.4316274),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    const checkin = await checkinsServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: randomUUID(),
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    expect(checkin.id_checkin).toEqual(expect.any(String));
  });

  it("should be able to check in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    const checkin = await checkinsServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: "user-01",
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    vi.setSystemTime(new Date(2023, 1, 1, 8, 0, 0));

    const newCheckin = await checkinsServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: "user-01",
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    expect(checkin.id_checkin).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    const checkin = await checkinsServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: randomUUID(),
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    await expect(() =>
      checkinsServices.CreateCheckinUser({
        id_gym: "gym-01",
        id_user: checkin.id_user,
        user_latitude: -1.4037809,
        user_longitude: -48.4308186,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to check in on distant gym", async () => {
    await expect(() =>
      checkinsServices.CreateCheckinUser({
        id_gym: "gym-01",
        id_user: "user-id",
        user_latitude: -1.4027809,
        user_longitude: -48.4308186,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
