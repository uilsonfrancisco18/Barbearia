const periods = document.querySelectorAll(".period")
import { scheduleDelete } from "../../services/schedule-delete.js";
import { schedulesDay } from "../schedules/load.js";


periods.forEach((period) => {
    period.addEventListener("click", async(event) => {
        // Handle click event
        if (event.target.classList.contains("cancel-icon")) {
            const item = event.target.closest(".li")
            const { id } = item.dataset

            if (id){
                const isConfirmed = confirm("Tem certeza que deseja cancelar este agendamento?")
                if (isConfirmed) {
                    await scheduleDelete({ id })
                    schedulesDay() // Recarrega a lista de agendamentos após a exclusão
                }
            }
        }
    });
});