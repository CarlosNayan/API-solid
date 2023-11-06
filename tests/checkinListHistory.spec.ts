import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckinsRepository } from "../src/repository/inMemoryRepository/inMemoryCheckinsRepository";
import { InMemoryGymsRepository } from "../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { CheckinListHistoryService } from "../src/services/checkinListHistoryService";
import { CheckinUserService } from "../src/services/checkinUserService";

let checkinsInMemoryRepository: InMemoryCheckinsRepository;
let gymsInMemoryRepository: InMemoryGymsRepository;

let checkinsUserServices: CheckinUserService;
let checkinListHistoryService: CheckinListHistoryService;

describe("history of Check-in use case", () => {
  beforeEach(async () => {
    checkinsInMemoryRepository = new InMemoryCheckinsRepository();
    gymsInMemoryRepository = new InMemoryGymsRepository();

    checkinListHistoryService = new CheckinListHistoryService(
      checkinsInMemoryRepository
    );
    checkinsUserServices = new CheckinUserService(
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

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to list history of check in", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 8, 0, 0));

    await checkinsUserServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: "user-01",
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    vi.setSystemTime(new Date(2023, 0, 2, 8, 0, 0));

    await checkinsUserServices.CreateCheckinUser({
      id_gym: "gym-02",
      id_user: "user-01",
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    const checkins =
      await checkinListHistoryService.ListAllCheckinsHistoryOfUser({
        id_user: "user-01",
      });

    expect(checkins).toHaveLength(2);
    expect(checkins).toEqual([
      expect.objectContaining({ id_gym: "gym-01" }),
      expect.objectContaining({ id_gym: "gym-02" }),
    ]);
  });

  it("should be able to list paginated history of check in", async () => {
    for (let i = 1; i <= 25; i++) {
      vi.setSystemTime(new Date(2023, 0, i, 8, 0, 0));

      await checkinsUserServices.CreateCheckinUser({
        id_gym: `gym-01`,
        id_user: "user-01",
        user_latitude: -1.4037809,
        user_longitude: -48.4308186,
      });
    }

    const checkins =
      await checkinListHistoryService.ListAllCheckinsHistoryOfUser({
        id_user: "user-01",
        page: 2,
      });

    expect(checkins).toHaveLength(5);
  });
});
