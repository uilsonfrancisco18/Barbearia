import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js"

const form = document.querySelector(".form")
const selectedDate = document.getElementById("date")
const clientName = document.getElementById("client")

//Carrega barra atual do dia
selectedDate.value = dayjs(new Date()).format("YYYY-MM-DD")   

//Data mínima para agendar o serviço
selectedDate.min = dayjs(new Date()).format("YYYY-MM-DD")


form.onsubmit = async(event) => {
    //previne o comportamento padrão do fomulário, que é carregar a página
    event.preventDefault(); 
    
    

    try{
        //Recuperando o nome do cliente 
        const name = clientName.value.trim()

   
        if(!name){
            return alert("Informe o nome do cliente!")
        }
        // Recupera horário selecionado
        const hourSelected = document.querySelector(".hour-selected")

        if (!hourSelected) {
            return alert("Selecione a hora!")
        }

        // Recupera somente a hora
        const [hour] = hourSelected.innerText.split(":")

        // Inserir a hora na data (mantendo formato ISO para salvar no JSON)
        const when = dayjs(selectedDate.value).hour(Number(hour)).minute(0).second(0)

        // Gera um ID
        const id = new Date().getTime()

        await scheduleNew({
            id,
            name,
            when: when.toISOString(),
        })

        // Recarrega agenda para refletir o novo agendamento
        schedulesDay()

    } catch(error) {
        alert("N~so foi possível realizar o agendamento.")
    }
}