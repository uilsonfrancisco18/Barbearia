import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { hoursLoad } from "../form/hours-loud.js";
import { scheduleShow } from "../schedules/show.js";

// Seleciona o input de data
const selectedDate = document.getElementById("date");

export async function schedulesDay() {
  try {
    // Obtém a data do input
    const date = selectedDate.value;

    // Se não houver data selecionada, não faz nada
    if (!date) {
      return;
    }

    // Busca na API os horários agendados para a data selecionada
    const dailySchedules = await scheduleFetchByDay({ date });

    // Exibe os agendamentos do dia
    scheduleShow({ dailySchedules });

    // Renderiza os horários disponíveis no formulário
    hoursLoad({ date });
  } catch (error) {
    console.log(error);
    alert("Não foi possível carregar os horários do dia.");
  }
}