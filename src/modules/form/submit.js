import dayjs from "dayjs";  
const form = document.querySelector(".form")
const selectedDate = document.getElementById("date")

//Carrega barra atual do dia
selectedDate.value = dayjs(new Date()).format("YYYY-MM-DD")   

//Data mínima para agendar o serviço
selectedDate.min = dayjs(new Date()).format("YYYY-MM-DD")


form.onsubmit = function(event) {
    //previne o comportamento padrão do fomulário, que é carregar a página
    event.preventDefault();     
}