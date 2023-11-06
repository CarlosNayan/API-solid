import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckinsRepository } from "../src/repository/inMemoryRepository/inMemoryCheckinsRepository";
import { InMemoryGymsRepository } from "../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { CheckinUserService } from "../src/services/checkinUserService";
import { CheckinUserValidateService } from "../src/services/checkinUserValidate";
import { ResourceNotFoundError } from "../src/errors/Errors";

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
});
