import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { GymsService } from "../src/services/gymsRegisterService";

let gymsInMemoryRepository: InMemoryGymsRepository;
let gymsService: GymsService;

describe("Register use case", () => {
  beforeEach(() => {
    gymsInMemoryRepository = new InMemoryGymsRepository();
    gymsService = new GymsService(gymsInMemoryRepository);
  });

  it("should be able to create a new gym", async () => {
    const gym = await gymsService.CreateGym({
      gym_name: "Ignite GYM",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id_gym).toEqual(expect.any(String));
  });
});
