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

export async function scheduleDelete(id) {
  try {
    console.log("Deletando agendamento ID:", id);

    await requestWithFallback(`/schedules/${id}`, {
      method: "DELETE",
    });

    console.log("Agendamento deletado com sucesso!");

    // Atualiza a lista de agendamentos
    const selectedDate = document.getElementById("date").value;
    await schedulesDay(selectedDate);

  } catch (error) {
    console.error("Erro em scheduleDelete:", error);
    alert(`Erro ao cancelar agendamento: ${error.message}`);
  }
}
