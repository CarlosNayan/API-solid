import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LateCheckinValidationError, ResourceNotFoundError } from "../src/errors/Errors";
import { InMemoryCheckinsRepository } from "../src/repository/inMemoryRepository/inMemoryCheckinsRepository";
import { InMemoryGymsRepository } from "../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { CheckinUserService } from "../src/services/checkinUserService";
import { CheckinUserValidateService } from "../src/services/checkinUserValidate";

let checkinsInMemoryRepository: InMemoryCheckinsRepository;
let gymsInMemoryRepository: InMemoryGymsRepository;
let checkinsUserServices: CheckinUserService;
let checkinUserValidateService: CheckinUserValidateService;

describe("validate check-in user use case", () => {
  beforeEach(async () => {
    checkinsInMemoryRepository = new InMemoryCheckinsRepository();
    gymsInMemoryRepository = new InMemoryGymsRepository();

    checkinsUserServices = new CheckinUserService(
      checkinsInMemoryRepository,
      gymsInMemoryRepository
    );

    checkinUserValidateService = new CheckinUserValidateService(
      checkinsInMemoryRepository
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

  it("should be able to validate check in", async () => {
    const checkIn = await checkinsUserServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: "user-01",
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    const foundCheckIn =
      await checkinUserValidateService.CreateCheckinUserValidate(
        checkIn.id_checkin
      );

    expect(foundCheckIn.validated_at).toEqual(expect.any(Date));
    expect(checkinsInMemoryRepository.items[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to validate inexistent check in", async () => {
    await expect(() =>
      checkinUserValidateService.CreateCheckinUserValidate("inexistent-id")
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const checkIn = await checkinsUserServices.CreateCheckinUser({
      id_gym: "gym-01",
      id_user: "user-01",
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    vi.setSystemTime(new Date(2023, 0, 1, 14, 1));

    await expect(() =>
      checkinUserValidateService.CreateCheckinUserValidate(checkIn.id_checkin)
    ).rejects.toBeInstanceOf(LateCheckinValidationError);
  });
});
