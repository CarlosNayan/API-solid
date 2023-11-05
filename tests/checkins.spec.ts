import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckinsRepository } from "../src/repository/inMemoryRepository/inMemoryCheckinsRepository";
import { InMemoryGymsRepository } from "../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { CheckinUserService } from "../src/services/checkinUserService";
import {
  MaxDistanceError,
  MaxNumberOfCheckInsError,
} from "../src/errors/Errors";

let checkinsInMemoryRepository: InMemoryCheckinsRepository;
let gymsInMemoryRepository: InMemoryGymsRepository;
let checkinsServices: CheckinUserService;

describe("Check-in use case", () => {
  beforeEach(async () => {
    checkinsInMemoryRepository = new InMemoryCheckinsRepository();
    gymsInMemoryRepository = new InMemoryGymsRepository();

    checkinsServices = new CheckinUserService(
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
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should not be able to check in on distant gym", async () => {
    await expect(() =>
      checkinsServices.CreateCheckinUser({
        id_gym: "gym-01",
        id_user: "user-id",
        user_latitude: -1.4027809,
        user_longitude: -48.4308186,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});

describe("History of Check-in use case", () => {
  beforeEach(async () => {
    checkinsInMemoryRepository = new InMemoryCheckinsRepository();
    gymsInMemoryRepository = new InMemoryGymsRepository();

    checkinsServices = new CheckinUserService(
      checkinsInMemoryRepository,
      gymsInMemoryRepository
    );

    await gymsInMemoryRepository.CreateGym({
      id_gym: "gym-01",
      gym_name: "Ignite Gym 01",
      phone: "",
      description: "",
      latitude: -1.403582,
      longitude: -48.4316274,
    });

    await gymsInMemoryRepository.CreateGym({
      id_gym: "gym-02",
      gym_name: "Ignite Gym 02",
      phone: "",
      description: "",
      latitude: -1.403582,
      longitude: -48.4316274,
    });
  });

  it("should be able to list history of check in", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    await checkinsServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: "user-01",
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    vi.setSystemTime(new Date(2023, 0, 2, 8, 0, 0));

    await checkinsServices.CreateCheckinUser({
      id_gym: "gym-02",
      id_user: "user-01",
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    const checkins = await checkinsServices.ListAllCheckinsHistoryOfUser({
      id_user: "user-01"
    });

    expect(checkins).toHaveLength(2);
    expect(checkins).toEqual([
      expect.objectContaining({ id_gym: "gym-01" }),
      expect.objectContaining({ id_gym: "gym-02" })
    ])
  });

  it("should be able to list paginated history of check in", async() => {

    for(let i = 1; i <= 25; i++){
      vi.setSystemTime(new Date(2023, 0, i, 8, 0, 0));

      await checkinsServices.CreateCheckinUser({
        id_gym: `gym-01`,
        id_user: "user-01",
        user_latitude: -1.4037809,
        user_longitude: -48.4308186,
      });
    }

    const checkins = await checkinsServices.ListAllCheckinsHistoryOfUser({
      id_user: "user-01",
      page: 2
    });

    expect(checkins).toHaveLength(5);
  })
});
