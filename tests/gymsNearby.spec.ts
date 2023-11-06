import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../src/repository/inMemoryRepository/inMemoryGymsRepository";
import { GymsNearbyService } from "../src/services/gymsNearbyService";

let gymsInMemoryRepository: InMemoryGymsRepository;
let gymsNearbyService: GymsNearbyService;

describe("get nearby gyms", () => {
  beforeEach(() => {
    gymsInMemoryRepository = new InMemoryGymsRepository();
    gymsNearbyService = new GymsNearbyService(gymsInMemoryRepository);
  });

  it("should be possible find nearby gyms (less 10km)", async () => {
    await gymsInMemoryRepository.CreateGym({
      id_gym: "gym-01",
      gym_name: "Ignite Gym",
      phone: "",
      description: "",
	  latitude: -1.439582,
	  longitude: -48.3216274,
    });

    await gymsInMemoryRepository.CreateGym({
		id_gym: "gym-02",
		gym_name: "Ignite Gym",
		phone: "",
		description: "",
		latitude: -1.439582,
		longitude: -48.4616274,
	  });

    await gymsInMemoryRepository.CreateGym({
      id_gym: "gym-03",
      gym_name: "Ignite Gym",
      phone: "",
      description: "",
	  latitude: -1.559582,
	  longitude: -48.4616274,
    });

    const nearbyGyms = await gymsNearbyService.GymsNearby({
      user_latitude: -1.4037809,
      user_longitude: -48.4308186,
    });

    expect(nearbyGyms).toEqual(expect.any(Array));
    expect(nearbyGyms).toHaveLength(1);
    expect(nearbyGyms).toEqual([expect.objectContaining({ id_gym: "gym-02" })]);
  });
});
