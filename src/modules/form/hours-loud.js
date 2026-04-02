import dayjs from "dayjs"
import { OpeningHours } from "../../utils/opening-hours.js"
import { hourClick } from "./hours-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({date}){
  hours.innerHTML = ""

  const opening = OpeningHours.map((hour) => {
    const [scheduleHour] = hour.split(":")
    const scheduleDate = dayjs(date).hour(Number(scheduleHour)).minute(0).second(0)
    const available = scheduleDate.isAfter(dayjs())

    return {
      hour,
      available
    }
  })
// Renderizar os horários

opening.forEach(({hour, available}) => {
  if (hour === "9:00") {
    hourHeaderAdd("Manhã")
  } else if (hour === "13:00") {
    hourHeaderAdd("Tarde")
  } else if (hour === "18:00") {
    hourHeaderAdd("Noite")
  }

  const li = document.createElement("li")
  li.classList.add("hour")
  li.classList.add(available ? "hour-available" : "hour-unavailable")
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