import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckinsRepository } from "../src/repository/inMemoryRepository/inMemoryCheckinsRepository";
import { InMemoryGymsRepository } from "../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { CheckinCountHistoryService } from "../src/services/checkinCountHistoryService";
import { CheckinUserService } from "../src/services/checkinUserService";

let checkinsInMemoryRepository: InMemoryCheckinsRepository;
let gymsInMemoryRepository: InMemoryGymsRepository;

let checkinsUserServices: CheckinUserService;
let checkinCountHistoryService: CheckinCountHistoryService;

describe("history Count of Check-in use case", () => {
  beforeEach(async () => {
    checkinsInMemoryRepository = new InMemoryCheckinsRepository();
    gymsInMemoryRepository = new InMemoryGymsRepository();

    checkinCountHistoryService = new CheckinCountHistoryService(
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
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to count history of check in", async () => {
    for (let i = 1; i <= 25; i++) {
      vi.setSystemTime(new Date(2023, 0, i, 8, 0, 0));

      await checkinsUserServices.CreateCheckinUser({
        id_gym: `gym-01`,
        id_user: "user-01",
        user_latitude: -1.4037809,
        user_longitude: -48.4308186,
      });
    }

    const checkins = await checkinCountHistoryService.CountByUserId({
      id_user: "user-01",
    });

    expect(checkins).toEqual(25);
  });
});
