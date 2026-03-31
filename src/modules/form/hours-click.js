export function hourClick(){
    const hours = document.querySelectorAll('.houer-available');
    






    hours.forEach((available) => {
        available.addEventListener("click", (selected) =>{
            hours.forEach((hour)=> {
                hour.classList.remove("houer-selected")
            })

            selected.target.classList.add("hour-selected")
        })
    })


    }
