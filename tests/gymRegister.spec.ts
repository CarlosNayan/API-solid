import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { GymsRegisterService } from "../src/services/gymsRegisterService";

let gymsInMemoryRepository: InMemoryGymsRepository;
let gymsRegisterService: GymsRegisterService;

describe("Register use case", () => {
  beforeEach(() => {
    gymsInMemoryRepository = new InMemoryGymsRepository();
    gymsRegisterService = new GymsRegisterService(gymsInMemoryRepository);
  });

  it("should be able to create a new gym", async () => {
    const gym = await gymsRegisterService.CreateGym({
      gym_name: "Ignite GYM",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id_gym).toEqual(expect.any(String));
  });
});
