import dayjs from "dayjs";
import { apiConfig } from "./api-config.js";

async function request(path, options) {
  const response = await fetch(`${apiConfig.baseUrl}${path}`, options);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response;
}

export async function scheduleFetchByDay({ date }) {
    try {
        const response = await request("/schedules", { method: "GET" });
        const data = await response.json();

        // normaliza datas sem timezone para comparação no calendário
        const selectedDateString = dayjs(date).format("YYYY-MM-DD");

        const dailySchedules = data.filter((schedule) => {
            const scheduleDateString = dayjs(schedule.when).format("YYYY-MM-DD");
            return scheduleDateString === selectedDateString;
        });

        console.log(`scheduleFetchByDay(${selectedDateString})`, dailySchedules);
        return dailySchedules;

    } catch (error) {
        console.error("Erro em scheduleFetchByDay:", error);
        return [];
    }
}