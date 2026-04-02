import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import { hoursLoad } from "../form/hours-loud.js"
import { schedulesShow } from "./show.js"
// Seleciona o input de data
const selectedDate = document.getElementById("date")

export async function schedulesDay(){
    // obtém a data do input
    const date = selectedDate.value

    // Buscar na API os horários agendados para a data selecionada
    const dailySchedules = await scheduleFetchByDay({ date: new Date(date) })
    console.log('dailySchedules from API', dailySchedules)

    // Exibir os agendamentos do dia
    schedulesShow(dailySchedules)
      
    // Renderizar horários disponíveis no formulário
    hoursLoad({ date })
}