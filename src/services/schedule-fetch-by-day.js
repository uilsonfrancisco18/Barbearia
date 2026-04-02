import dayjs from "dayjs";
import { apiConfig } from "./api-config.js";

async function requestWithFallback(path, options) {
    const urls = [apiConfig.baseUrl, "http://localhost:3001"];

    for (const baseUrl of urls) {
        try {
            const response = await fetch(`${baseUrl}${path}`, options);
            if (response.ok) {
                return response;
            }
            console.warn(`Request to ${baseUrl}${path} returned ${response.status}`);
        } catch (err) {
            console.warn(`Request to ${baseUrl}${path} failed:`, err.message);
        }
    }

    throw new Error(`Nenhum servidor disponível para requisição ${path}`);
}

export async function scheduleFetchByDay({ date }) {
    try {
        const response = await requestWithFallback("/schedules", { method: "GET" });
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