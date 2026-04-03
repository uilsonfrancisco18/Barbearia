import { apiConfig } from "./api-config";
import { schedulesDay } from "../modules/schedules/load.js";

async function request(path, options) {
  const response = await fetch(`${apiConfig.baseUrl}${path}`, options);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response;
}

export async function scheduleDelete({ id }) {
  try {
    console.log("Deletando agendamento ID:", id);

    await request(`/schedules/${id}`, {
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
