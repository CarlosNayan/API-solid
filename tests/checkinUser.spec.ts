import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  MaxDistanceError,
  MaxNumberOfCheckInsError,
} from "../src/errors/Errors";
import { InMemoryCheckinsRepository } from "../src/repository/inMemoryRepository/inMemoryCheckinsRepository";
import { InMemoryGymsRepository } from "../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { CheckinUserService } from "../src/services/checkinUserService";

let checkinsInMemoryRepository: InMemoryCheckinsRepository;
let gymsInMemoryRepository: InMemoryGymsRepository;
let checkinsUserServices: CheckinUserService;

describe("create check-in user use case", () => {
  beforeEach(async () => {
    checkinsInMemoryRepository = new InMemoryCheckinsRepository();
    gymsInMemoryRepository = new InMemoryGymsRepository();

    checkinsUserServices = new CheckinUserService(
      checkinsInMemoryRepository,
      gymsInMemoryRepository
    );

    await gymsInMemoryRepository.CreateGym({
      id_gym: "gym-01",
      gym_name: "Ignite Gym",
      phone: "",
      description: "",
      latitude: -1.403582,
      longitude: -48.4316274,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    const checkin = await checkinsUserServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: randomUUID(),
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    expect(checkin.id_checkin).toEqual(expect.any(String));
  });

  it("should be able to check in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    const checkin = await checkinsUserServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: "user-01",
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    vi.setSystemTime(new Date(2023, 1, 1, 8, 0, 0));

    const newCheckin = await checkinsUserServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: "user-01",
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    expect(checkin.id_checkin).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    const checkin = await checkinsUserServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: randomUUID(),
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    await expect(() =>
      checkinsUserServices.CreateCheckinUser({
        id_gym: "gym-01",
        id_user: checkin.id_user,
        user_latitude: -1.4037809,
        user_longitude: -48.4308186,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should not be able to check in on distant gym", async () => {
    await expect(() =>
      checkinsUserServices.CreateCheckinUser({
        id_gym: "gym-01",
        id_user: "user-id",
        user_latitude: -1.4027809,
        user_longitude: -48.4308186,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
