const up_1 = document.getElementById("up-1");
const up_2 = document.getElementById("up-2");
const up_3 = document.getElementById("up-3");
const up_4 = document.getElementById("up-4");

const down_5 = document.getElementById("down-5");
const down_4 = document.getElementById("down-4");
const down_3 = document.getElementById("down-3");
const down_2 = document.getElementById("down-2");

const mainContainer = document.getElementById("main-container");
const lift = document.querySelector(".lift");

const numberOfLift = 2;
const floorClasses = ["floor-1", "floor-2", "floor-3", "floor-4", "floor-5"]


// for(let i = 0; i <= numberOfLift; i++){
//     mainContainer.innerHTML= `

//     `
// }

// adding event listners
up_1.addEventListener('click', () => { upLift(floorClasses[0]) })
up_2.addEventListener('click', () => { upLift(floorClasses[1]) })
up_3.addEventListener('click', () => { upLift(floorClasses[2]) })
up_4.addEventListener('click', () => { upLift(floorClasses[3]) })

down_2.addEventListener('click', () => { downLift(floorClasses[1]) })
down_3.addEventListener('click', () => { downLift(floorClasses[2]) })
down_4.addEventListener('click', () => { downLift(floorClasses[3]) })
down_5.addEventListener('click', () => { downLift(floorClasses[4]) })




function upLift(floorClassStr) {
    removeFloorClesses()
    lift.classList.add(floorClassStr)
}
function downLift(floorClassStr) {
    removeFloorClesses()
    lift.classList.add(floorClassStr)
}

function removeFloorClesses() {
    floorClasses.forEach(floor => {
        lift.classList.remove(floor)
    })
}
