import { apiConfig } from "./api-config";
import { schedulesDay } from "../modules/schedules/load.js";

async function request(path, options) {
  const response = await fetch(`${apiConfig.baseUrl}${path}`, options);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response;
}

export async function scheduleNew({ id, name, when }) {
  const body = { id, name, when };
  console.log("scheduleNew payload", body);

  await request("/schedules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
