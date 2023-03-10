import { checkYear, roundCheck } from "../lib/utils";
import { F1 } from "./data-source";

export class DriversData extends F1 {
  constructor() {
    super();
  }

  async getDrivers(size: number = -1, page: number = 1) {
    if (size === -1) {
      return await this.get("drivers.json?limit=1000", {
        cacheOptions: { ttl: 60 },
      });
    }

    const offset = (page - 1) * size;
    const limit = size;

    return await this.get(`drivers.json?limit=${limit}&offset=${offset}`, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getDriversByYear(year: string) {
    year = checkYear(year);
    return await this.get(String(year).concat("/drivers.json"), {
      cacheOptions: { ttl: 60 },
    });
  }

  async getDriversByYearAndRound(year: string, round: number) {
    year = checkYear(year);
    round = roundCheck(round);
    return await this.get(
      String(year).concat(`/${round}`).concat("/drivers.json"),
      {
        cacheOptions: { ttl: 60 },
      }
    );
  }

  async getDriver(id: string) {
    return await this.get(`drivers/${id}.json`, { cacheOptions: { ttl: 60 } });
  }

  async getDriverStandings(year: string) {
    year = checkYear(year);
    return await this.get(String(year).concat("/driverStandings.json"), {
      cacheOptions: { ttl: 60 },
    });
  }
}
