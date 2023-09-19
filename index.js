const mainContainer = document.getElementById("main-container");
const maintenance = document.getElementById("maintenance");

// const numberOfLift = 6;
// const numberOfFloor = 10;
const numberOfLift = prompt("Enter Numer of Lift: ");
const numberOfFloor = prompt("Enter numer of floors: ");
let userEnterdFloor;
let nearestLift;
let randomNum = 0;
let liftFloorData = []; //saves current floor data
for (let i = 0; i < numberOfLift; i++) {
    liftFloorData.push(1);
}

for (let i = 0; i < numberOfLift; i++) {
    const liftHtml =
        `
<div id="lift-container-${i}" class="lift-container">
   <div class="doors">
      <div id="lift-${i}" class="${i} lift">
      <span>${1}</span>
      </div>
      <div class="form-check form-switch position-absolute bottom-0 start-50 translate-middle-x">
         <input class="${i} form-check-input" type="checkbox" role="switch"
            id="switch-${i}">
      </div>
   </div>
</div>`;
    mainContainer.insertAdjacentHTML("afterbegin", liftHtml)
}

for (let i = 0; i < numberOfFloor; i++) {
    const florHtml =
        `
    <div class="floor">
        <p>${i + 1}</p>
        <div id="up-${i + 1}" class=" ${i + 1} aeroBtn btn-up">&uarr;</div>
        <div id="down-${i + 1}" class=" ${i + 1} aeroBtn btn-down">&darr;</div>
    </div>
    `
    maintenance.insertAdjacentHTML("afterbegin", florHtml)
}

const lift = document.querySelectorAll(".lift-container .doors .lift");
const switchBtn = document.querySelectorAll(".form-check-input");
const liftBtn = document.querySelectorAll(".aeroBtn");

// adding event listners
switchBtn.forEach(btn => {
    btn.addEventListener('click', switchBtnhandle);
})

liftBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        userEnterdFloor = Number(e.target.classList[0]);
        if (checkAllBlock()) {
            console.log("all lifts are blocked");
        } else {
            handleLiftBtn(userEnterdFloor);
        }
    })
})


function switchBtnhandle(e) {
    const indexOfLift = e.target.classList[0];
    const checkedOrNot = e.target.checked;

    if (checkedOrNot) {
        lift.forEach((x, index) => {
            if (x.classList[0] === `${indexOfLift}`) {


                liftFloorData[index] = Number.NEGATIVE_INFINITY
                moveLift(x, 1);
                x.classList.add("blocked");
            }
        })
    } else if (checkedOrNot === false) {
        lift.forEach((x, index) => {
            if (x.classList[0] === `${indexOfLift}`) {
                liftFloorData[index] = 1
                moveLift(x, 1);
                x.classList.remove("blocked");
            }
        })
    }
}

function checkAllBlock() {
    let count = 1;
    lift.forEach(ele => {
        if (ele.classList.contains("blocked")) {
            count++;
        }
    });
    return true ? count > numberOfLift : false;
}

function findNearestLift(floorNum) {
    // function returns nearst lift index to the floor
    if (liftFloorData.every(ele => ele === 1)) {
        return Math.trunc(Math.random() * numberOfLift);
    }

    let min = numberOfFloor, minIndex = 0;
    for (let i = 0; i < numberOfLift; i++) {
        if ((Math.abs(floorNum - liftFloorData[i])) < min) {
            min = Math.abs(floorNum - liftFloorData[i]);
            minIndex = i;
        }
    }
    return minIndex;
}

function handleLiftBtn(floorNum) {
    nearestLift = findNearestLift(floorNum);
    liftFloorData[nearestLift] = floorNum;
    moveLift(lift[nearestLift], floorNum);
}

function moveLift(lift, floor) {
    lift.style.bottom = `${(100 * (floor - 1))}px`
    lift.querySelector("span").textContent = floor;
}
