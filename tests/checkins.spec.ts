import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckinsRepository } from "../src/repository/inMemoryRepository/inMemoryCheckinsRepository";
import { CheckinUserService } from "../src/services/checkinUserService";
import { randomUUID } from "node:crypto";

let checkinsInMemoryRepository: InMemoryCheckinsRepository;
let checkinsServices: CheckinUserService;

describe("Check-in use case", () => {
  beforeEach(() => {
    checkinsInMemoryRepository = new InMemoryCheckinsRepository();
    checkinsServices = new CheckinUserService(checkinsInMemoryRepository);
  });

  it("should be able to check in", async () => {
    const checkin = await checkinsServices.CreateCheckinUser({
      id_gym: randomUUID(),
      id_user: randomUUID(),
    });

    expect(checkin.id_checkin).toEqual(expect.any(String));
  });
});
