import { apiConfig } from "./api-config";
import { schedulesDay } from "../modules/schedules/load.js";

async function requestWithFallback(path, options) {
  const urls = [apiConfig.baseUrl, "http://localhost:3001"];

  for (const baseUrl of urls) {
    try {
      console.log("Tentando URL:", `${baseUrl}${path}`);

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

export async function scheduleNew({ id, name, when }) {
  try {
    const body = { id, name, when };
    console.log("scheduleNew payload", body);

    await requestWithFallback("/schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    alert("Horário agendado com sucesso!");

    // 🔥 PEGA A DATA SELECIONADA E ATUALIZA A TELA
    const selectedDate = document.getElementById("date").value;

    await schedulesDay(selectedDate);

  } catch (error) {
    console.error("Erro em scheduleNew:", error);
    alert(`Ocorreu um erro ao agendar o horário. Por favor, tente novamente. (${error.message})`);
  }
}