import dayjs from "dayjs";
import cancelIconPath from "../../assets/cancel.svg";

const BASE_URL = "http://localhost:3333";

export function schedulesShow(daySchedules = []) {

  const periodMorning = document.getElementById("period-morning");
  const periodAfternoon = document.getElementById("period-afternoon");
  const periodENight = document.getElementById("period-night");

  try {
    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodENight.innerHTML = "";

    daySchedules.forEach((schedule) => {
      const item = document.createElement("li");
      const time = document.createElement("strong");
      const name = document.createElement("span");

      item.setAttribute("data-id", schedule.id);

      const scheduleTime = dayjs(schedule.when).format("HH:mm");
      time.textContent = scheduleTime;
      name.textContent = schedule.name;

      item.title = `${scheduleTime} - ${schedule.name}`;

      const cancelIcon = document.createElement("img");
      cancelIcon.classList.add("cancel-icon");
      cancelIcon.src = cancelIconPath;
      cancelIcon.alt = "Cancelar";
      cancelIcon.style.cursor = "pointer";

      cancelIcon.addEventListener("click", async (event) => {
        event.stopPropagation();

        if (!confirm("Deseja cancelar esse agendamento?")) return;

        try {
          await fetch(`${BASE_URL}/schedules/${schedule.id}`, {
            method: "DELETE",
          });

          item.remove();

        } catch (error) {
          console.error("Erro ao excluir:", error);
          alert("Erro ao cancelar");
        }
      });

      item.appendChild(time);
      item.appendChild(name);
      item.appendChild(cancelIcon);

      const hour = dayjs(schedule.when).hour();

      if (hour <= 12) {
        periodMorning.appendChild(item);
      } else if (hour <= 18) {
        periodAfternoon.appendChild(item);
      } else {
        periodENight.appendChild(item);
      }
    });

  } catch (error) {
    console.error(error);
    alert("Erro ao renderizar horários");
  }
}