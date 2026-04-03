import dayjs from "dayjs"
import { OpeningHours } from "../../utils/opening-hours.js"
import { hourClick } from "./hours-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules }) {
  hours.innerHTML = ""

  // Obtem a lista de todos os horarios ocupados
  const unavailableHours = dailySchedules.map(schedule =>
    dayjs(schedule.when).format("HH:mm")
  )

  const opening = OpeningHours.map((hour) => {
    const [scheduleHour] = hour.split(":")

    const scheduleDate = dayjs(date)
      .hour(Number(scheduleHour))
      .minute(0)
      .second(0)

    const isHourPast = scheduleDate.isBefore(dayjs())

    const available =
      !unavailableHours.includes(hour) && !isHourPast

    return {
      hour,
      available,
    }
  }) // ✅ FECHOU O MAP AQUI

  // Renderizar os horários
  opening.forEach(({ hour, available }) => {
    if (hour === "09:00") {
      hourHeaderAdd("Manhã")
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde")
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite")
    }

    const li = document.createElement("li")
    li.classList.add("hour")
    li.classList.add(
      available ? "hour-available" : "hour-unavailable"
    )
    li.textContent = hour

    hours.append(li)
  })

  // Adiciona eventos de clique depois de renderizar os itens
  hourClick()
}

function hourHeaderAdd(title) {
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}