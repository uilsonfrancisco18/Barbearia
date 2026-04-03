import dayjs from "dayjs";
import cancelIconPath from "../../assets/cancel.svg";
import { scheduleDelete } from "../../services/schedule-delete.js";
console.log("SVG:", cancelIconPath);


const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodEvening = document.getElementById("period-night");

export function scheduleShow({ dailySchedules }) {
  try {
    // Limpa os períodos antes de renderizar
    periodMorning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodEvening.innerHTML = ""

    dailySchedules.forEach((schedule) => {
      // Lógica para renderizar cada agendamento
      const item = document.createElement("li");
      const time = document.createElement("Strong");
      const name = document.createElement("span");


      //Adicionar o id do agendamento 
      item.setAttribute("data-id", schedule.id)

      time.textContent = dayjs(schedule.when).format("HH:mm");
      name.textContent = schedule.name;

      //Item de cancelar
      const cancelIcon = document.createElement("img");
      cancelIcon.classList.add("cancel-icon");
      cancelIcon.setAttribute("src", cancelIconPath);
      cancelIcon.setAttribute("alt", "Cancelar ");

      // Adiciona clique para deletar agendamento
      cancelIcon.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
          scheduleDelete(schedule.id);
        }
      });


      //Adicionar tempo, nome e ícone
      item.append(time, name, cancelIcon);

      //Óbtem somente a hora
      const hour = dayjs(schedule.when).hour();


      //renderiza o agendamento na sessao de forma condicional
      if (hour >= 6 && hour < 12) {

        periodMorning.appendChild(item);
      } else if (hour >= 13 && hour < 18) {

        periodAfternoon.appendChild(item);
      } else {

        periodEvening.appendChild(item);
      }
    });
  } catch (error) {
    console.log("Erro ao exibir agendamentos:", error)
  }
}