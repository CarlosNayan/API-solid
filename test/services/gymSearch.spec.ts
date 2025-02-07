import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { GymsRegisterService } from "../../src/services/gymsRegisterService";
import { GymsSearchService } from "../../src/services/gymsSearchService";

let gymsInMemoryRepository: InMemoryGymsRepository;
let gymsSearchService: GymsSearchService;
let gymsRegisterService: GymsRegisterService;

describe("gyms search use case", () => {
  beforeEach(() => {
    gymsInMemoryRepository = new InMemoryGymsRepository();
    gymsSearchService = new GymsSearchService(gymsInMemoryRepository);
    gymsRegisterService = new GymsRegisterService(gymsInMemoryRepository);
  });

  it("should be able to search gyms", async () => {
    await gymsRegisterService.CreateGym({
      gym_name: "javascript GYM",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    await gymsRegisterService.CreateGym({
      gym_name: "typescript GYM",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    const gymFiltered = await gymsSearchService.SearchGym({
      query: "java",
    });

    expect(gymFiltered).toEqual(expect.any(Array));
    expect(gymFiltered).toHaveLength(1);
    expect(gymFiltered).toEqual([
      expect.objectContaining({ gym_name: "javascript GYM" }),
    ]);
  });

  it("should be able to paginated search gyms", async () => {
    for (let i = 1; i <= 23; i++) {
      await gymsRegisterService.CreateGym({
        gym_name: `Ignite GYM ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      });
    }

    const gymFiltered = await gymsSearchService.SearchGym({
      query: "gym",
      page: 2,
    });

    expect(gymFiltered).toEqual(expect.any(Array));
    expect(gymFiltered).toHaveLength(3);
    expect(gymFiltered).toEqual([
      expect.objectContaining({ gym_name: "Ignite GYM 21" }),
      expect.objectContaining({ gym_name: "Ignite GYM 22" }),
      expect.objectContaining({ gym_name: "Ignite GYM 23" }),
    ]);
  });
});
