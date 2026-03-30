import dayjs from "dayjs"
import { OpeningHours } from  "../../utils/opening-hours.js"


const hours = document.getElementById("hours")

export function hoursLoad(date){
    const opning = openingHours.map((hour) => {
        const [scheduleHour] = hour.split(":")


    const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs())
    
    

    return {
        hour,
        available: isHourPast
    }
     
})
//Renderizar os harários

opening.forEach(({hour, available}) =>{
    const li = document.createElement("li")

    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")


    li.textContent = hour
    hours.append(li)
        
})

}