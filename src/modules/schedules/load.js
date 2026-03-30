import { hoursLoad } from "../form/hours-loud.js"

//Seleciona o ibput de data
const selectedDate = document.getElementById("date")

export function schedulesDay(){
    //obtém a data do input
    const date = selectedDate.value



    hoursLoad({date}) 



}