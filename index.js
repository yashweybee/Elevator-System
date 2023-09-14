// const up_1 = document.getElementById("up-1");
// const up_2 = document.getElementById("up-2");
// const up_3 = document.getElementById("up-3");
// const up_4 = document.getElementById("up-4");

// const down_5 = document.getElementById("down-5");
// const down_4 = document.getElementById("down-4");
// const down_3 = document.getElementById("down-3");
// const down_2 = document.getElementById("down-2");

const liftBtn = document.querySelectorAll(".aeroBtn");

const mainContainer = document.getElementById("main-container");

const floorClasses = ["floor-1", "floor-2", "floor-3", "floor-4", "floor-5"]
const numberOfLift = 3;
// let currentFloor = 1;
let userEnterdFloor;
let nearestLift;
let randomNum = 0;
let liftFloorData = []; //saves current floor data

for (let i = 0; i < numberOfLift; i++) {
    liftFloorData.push(1);
}
console.log(liftFloorData);

for (let i = 0; i < numberOfLift; i++) {
    const liftHtml =
        `
    <div id="lift-container-${i}" class="lift-container">
   <div class="doors">
      <div id="lift-${i}" class="lift"><span>${liftFloorData[i]}</span></div>
      <div class="form-check form-switch position-absolute bottom-0 start-50 translate-middle-x">
         <input class="form-check-input" type="checkbox" role="switch"
            id="switch-${i}">
      </div>
   </div>
</div>`
    mainContainer.insertAdjacentHTML("afterbegin", liftHtml)
}
const lift = document.querySelectorAll(".lift-container .doors .lift");
const switchBtn = document.querySelectorAll(".form-check-input");
// console.log(lift);


// adding event listners
switchBtn.forEach(btn => {
    btn.addEventListener('click', switchBtnhandle)
})

liftBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        userEnterdFloor = Number(e.target.id.slice(-1))
        handleLiftBtn(userEnterdFloor);
    })
})

// up_1.addEventListener('click', () => { upLift(floorClasses[0]) })
// up_2.addEventListener('click', () => { upLift(floorClasses[1]) })
// up_3.addEventListener('click', () => { upLift(floorClasses[2]) })
// up_4.addEventListener('click', () => { upLift(floorClasses[3]) })

// down_2.addEventListener('click', () => { downLift(floorClasses[1]) })
// down_3.addEventListener('click', () => { downLift(floorClasses[2]) })
// down_4.addEventListener('click', () => { downLift(floorClasses[3]) })
// down_5.addEventListener('click', () => { downLift(floorClasses[4]) })


function switchBtnhandle(e) {
    if (e.target.checked) {
        console.log(e.target.id.slice(-1));
        lift.forEach(x => {
            if (x.id === `lift-${e.target.id.slice(-1)}`) {
                removeFloorClesses()
                x.classList.add("blocked");
            }
        })
    } else if (e.target.checked === false) {
        lift.forEach(x => {
            if (x.id === `lift-${e.target.id.slice(-1)}`) {
                removeFloorClesses();
                x.classList.remove("blocked");
            }
        })
    }
}

function findNearestLift(floorNum) {
    // function returns nearst lift index to the floor
    if (liftFloorData.every(ele => ele === 1)) {
        return Math.trunc(Math.random() * numberOfLift);
    }

    let min = 5, minIndex = 0;
    for (let i = 0; i < liftFloorData.length; i++) {
        if ((Math.abs(floorNum - liftFloorData[i])) < min) {
            min = Math.abs(floorNum - liftFloorData[i]);
            minIndex = i;
        }
    }
    return minIndex;
}

function handleLiftBtn(floorNum) {
    // randomNum = Math.trunc(Math.random() * numberOfLift);

    nearestLift = findNearestLift(floorNum);
    liftFloorData[nearestLift] = floorNum;
    console.log(liftFloorData);

    removeFloorClesses();
    lift[nearestLift].classList.add(`floor-${floorNum}`);
    lift[nearestLift].querySelector("span").textContent = liftFloorData[nearestLift]
}

function removeFloorClesses() {
    floorClasses.forEach(floor => {
        lift[nearestLift].classList.remove(floor);
    })
}
