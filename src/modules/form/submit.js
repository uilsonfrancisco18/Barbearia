import dayjs from "dayjs";  
const form = document.querySelector(".form")
const selectedDate = document.getElementById("date")
const clientName = document.getElementById("client")

//Carrega barra atual do dia
selectedDate.value = dayjs(new Date()).format("YYYY-MM-DD")   

//Data mínima para agendar o serviço
selectedDate.min = dayjs(new Date()).format("YYYY-MM-DD")


form.onsubmit = function(event) {
    //previne o comportamento padrão do fomulário, que é carregar a página
    event.preventDefault(); 
    
    

    try{
        //Recuperando o nome do cliente 
        const name = clientName.value.trim()

   
        if(!name){
            return alert("Informe o nome do cliente!")
        }
        //Recupera horário selecionado
        const hourSeleted = document.querySelector(".hour-selected")
       
        if (!hourSelected){
            return alert("Selecione a hora!")
        }


      //Recupera somento a hora
      const [hour] = hourSelected.innerText.split(":")


      //Inserir a hora na data
      const when = dayjs(selectedDate.value).add(hour, "hour")
      
      //Gera um ID
      const id = new Date().getTime()
       
      console.log({
        id,
        name,
        when,
      })


    }catch(error){
        alert("N~so foi possível realizar o agendamento.")
    }
}