console.log("workout page js linked");

let workoutElements = document.querySelectorAll(".workouts-workout-individual");
let workoutCountElement = document.getElementById(
  "workouts-personal-stats-workouts"
);
let countWorkouts = workoutElements.length;

workoutCountElement.textContent = `Workouts: ${countWorkouts}`;

let calorieElements = document.querySelectorAll(".workouts-workout-cals");
let calorieCountElement = document.getElementById(
  "workouts-personal-stats-cal"
);
let countCalories = 0;
calorieElements.forEach((element) => {
  let cal = element.textContent.split(" ");
  let calNum = parseInt(cal[0]);
  countCalories = countCalories + calNum;
});
calorieCountElement.textContent = `Calories Burned: ${countCalories}cal`;

const addWorkoutButton = document.getElementById("workouts-workout-add-button");
let openWorkoutForm = false;

addWorkoutButton.addEventListener("click", function () {
  if (openWorkoutForm === true) {
    return;
  } else {
    let newWorkoutForm = `
    <form action="/workouts" method="POST" name="new-workout-form" id="new-workout-form" class="workouts-workout-individual">
        <div class="workouts-workout-title">
          <select id="workoutType" name="workoutType" class="workouts-workout-type">
            <option value="Weight Training">Weight Training</option>
            <option value="Cardio">Cardio</option>
          </select>
          <input id="caloriesBurned" name="caloriesBurned" type="text" placeholder="" class="workouts-workout-cals">cal</input>
        </div>
      <div id="workouts-caloriesBurnedError"></div>
      <div class="workouts-workout-subtitle">
        <input id="date" name="date" type="date" class="workouts-workout-date"></input>
        <div class=workouts-workout-time>
            Time Elapsed:
            <input id="timeElapsedH" name="timeElapsedH" type="text" placeholder="HH" >:</input>
            <input id="timeElapsedM" name="timeElapsedM" type="text" placeholder="MM" >:</input>
            <input id="timeElapsedS" name="timeElapsedS" type="text" placeholder="SS" ></input>
        </div>
      </div>
      <div id="workouts-subtitleError-container">
        <div id="workouts-dateError"></div>
        <div id="workouts-timeElapsedError"></div>
      </div>
      
      <button id="workouts-workout-add-exercise-button">Add an exercise +</button>
      <div class="workouts-workout-exercise-grid">
        <div class="workouts-workout-exercise-grid-item-header grid-exercise">Exercise</div>
        <div class="workouts-workout-exercise-grid-item-header grid-sets">S/d
        </div>
        <div class="workouts-workout-exercise-grid-item-header grid-reps">
        R/d
        </div>
        <div class="workouts-workout-exercise-grid-item-header grid-weight">
        W/
        </div>

    </div>
    <div class="workouts-workout-button-container">
        <button id="cancelNewWorkoutButton" class="workouts-workout-delete-button flex">
        <img src="/public/images/trashIcon.png">
        </button>
        <button id="doneWorkoutButton" name="doneWorkoutButton" type="submit" class="workouts-workout-done-button flex">Done</button>
    </div>
    </form>
  `;

    document
      .getElementById("workouts-workout-grid")
      .insertAdjacentHTML("afterbegin", newWorkoutForm);
    openWorkoutForm = true;

    //////////////////////////////////

    const addExerciseButton = document.getElementById(
      "workouts-workout-add-exercise-button"
    );

    addExerciseButton.addEventListener("click", function (event) {
      event.preventDefault();
      let newWorkoutForm = document.getElementById("new-workout-form");
      let newExerciseRow = `
          <input type="text" class="workouts-workout-exercise-grid-item grid-exercise"></input>
          <input type="text" class="workouts-workout-exercise-grid-item grid-sets">
          </input>
          <input type="text" class="workouts-workout-exercise-grid-item grid-reps">
          </input>
          <input type="text" class="workouts-workout-exercise-grid-item grid-weight">
          </input>
        `;
      let workoutContainers = newWorkoutForm.getElementsByClassName(
        "workouts-workout-exercise-grid"
      );
      for (let i = 0; i < workoutContainers.length; i++) {
        workoutContainers[i].insertAdjacentHTML("beforeend", newExerciseRow);
      }
      openWorkoutForm = true;
      return;
    });

    const cancelNewWorkoutButton = document.getElementById(
      "cancelNewWorkoutButton"
    );

    cancelNewWorkoutButton.addEventListener("click", function (event) {
      openWorkoutForm = false;
      event.preventDefault();
      let newWorkoutForm = document.getElementById("new-workout-form");
      newWorkoutForm.remove();
    });

    ////// data validation for header
    const newWorkoutFormElement = document.getElementById("new-workout-form");
    console.log("checking form exists");
    if (newWorkoutFormElement !== null) {
      console.log("form exists");
      newWorkoutFormElement.addEventListener("submit", (event) => {
        console.log("form submitted");
        console.log(isFormValid);
        if (!isFormValid()) {
          const caloriesBurnedInput = document.getElementById("caloriesBurned");
          const caloriesBurnedError = document.getElementById(
            "workouts-caloriesBurnedError"
          );
          if (caloriesBurnedError !== null) {
            caloriesBurnedInput.addEventListener("input", function () {
              caloriesBurnedError.textContent = "";
              caloriesBurnedInput.classList.remove("errorBorder");
            });
          }
          const dateInput = document.getElementById("date");
          const dateError = document.getElementById("workouts-dateError");
          if (dateError !== null) {
            dateInput.addEventListener("input", function () {
              dateError.textContent = "";
              dateInput.classList.remove("errorBorder");
            });
          }
          const timeInputH = document.getElementById("timeElapsedH");
          const timeInputM = document.getElementById("timeElapsedM");
          const timeInputS = document.getElementById("timeElapsedS");
          const timeError = document.getElementById(
            "workouts-timeElapsedError"
          );
          if (timeError !== null) {
            timeInputH.addEventListener("input", function () {
              timeError.textContent = "";
              timeInputH.classList.remove("errorBorder");
            });
            timeInputM.addEventListener("input", function () {
              timeError.textContent = "";
              timeInputM.classList.remove("errorBorder");
            });
            timeInputS.addEventListener("input", function () {
              timeError.textContent = "";
              timeInputS.classList.remove("errorBorder");
            });
          }
          event.preventDefault();
        }
      });
    }

    function isFormValid() {
      let badFields = false;

      //// calories
      const caloriesBurnedElement = document.getElementById("caloriesBurned");
      if (caloriesBurnedElement !== null) {
        let caloriesBurnedValue = caloriesBurnedElement.value;
        let caloriesBurnedError = document.getElementById(
          "workouts-caloriesBurnedError"
        );
        if (isNaN(caloriesBurnedValue)) {
          caloriesBurnedError.textContent = "Calories must be a number";
          caloriesBurnedElement.classList.add("errorBorder");
          badFields = true;
        }
        caloriesBurnedValue.trim();
        if (caloriesBurnedValue === "") {
          caloriesBurnedError.textContent = "Must enter calories burned";
          caloriesBurnedElement.classList.add("errorBorder");
          badFields = true;
        }
      }

      ///// Date
      const dateElement = document.getElementById("date");

      if (dateElement !== null) {
        let dateValue = dateElement.value;
        let dateError = document.getElementById("workouts-dateError");
        console.log(dateValue);

        dateValue.trim();
        if (dateValue === "") {
          dateError.textContent = "Must enter a date";
          dateElement.classList.add("errorBorder");
          badFields = true;
        }

        let dateArr = dateValue.split("-");
        let dateY = parseInt(dateArr[0]);
        let dateM = parseInt(dateArr[1]);
        let dateD = parseInt(dateArr[2]);

        if (dateY > 2024) {
          dateError.textContent = "Invalid Date";
          dateElement.classList.add("errorBorder");
          badFields = true;
        }
        if (dateY < 2014) {
          dateError.textContent = "Invalid Date";
          dateElement.classList.add("errorBorder");
          badFields = true;
        }
        if (dateM < 0) {
          dateError.textContent = "Invalid Date";
          dateElement.classList.add("errorBorder");
          badFields = true;
        }
        if (dateM > 12) {
          dateError.textContent = "Invalid Date";
          dateElement.classList.add("errorBorder");
          badFields = true;
        }
        if (dateD < 0) {
          dateError.textContent = "Invalid Date";
          dateElement.classList.add("errorBorder");
          badFields = true;
        }
        if (dateD > 31) {
          dateError.textContent = "Invalid Date";
          dateElement.classList.add("errorBorder");
          badFields = true;
        }

        let currentDate = new Date();
        let currYear = currentDate.getFullYear();
        let currMonth = currentDate.getMonth() + 1;
        let currDay = currentDate.getDate();

        console.log(currYear);
        console.log(currMonth);
        console.log(currDay);

        if (dateY === currYear) {
          if (dateM > currMonth) {
            dateError.textContent = "Invalid Date";
            dateElement.classList.add("errorBorder");
            badFields = true;
          } else if (dateM === currMonth) {
            if (dateD > currDay) {
              dateError.textContent = "Invalid Date";
              dateElement.classList.add("errorBorder");
              badFields = true;
            }
          }
        }
      }

      ///// Time Elapsed
      const timeElementH = document.getElementById("timeElapsedH");
      const timeElementM = document.getElementById("timeElapsedM");
      const timeElementS = document.getElementById("timeElapsedS");

      if (timeElementH !== null) {
        let timeElementHValue = timeElementH.value;
        let timeElementMValue = timeElementM.value;
        let timeElementSValue = timeElementS.value;
        let timeElapsedError = document.getElementById(
          "workouts-timeElapsedError"
        );

        timeElementHValue.trim();
        timeElementMValue.trim();
        timeElementSValue.trim();
        if (timeElementHValue === "") {
          timeElapsedError.textContent = "Invalid time";
          timeElementH.classList.add("errorBorder");
          badFields = true;
        }
        if (timeElementMValue === "") {
          timeElapsedError.textContent = "Invalid time";
          timeElementM.classList.add("errorBorder");
          badFields = true;
        }
        if (timeElementSValue === "") {
          timeElapsedError.textContent = "Invalid time";
          timeElementS.classList.add("errorBorder");
          badFields = true;
        }
        if (isNaN(timeElementHValue)) {
          timeElapsedError.textContent = "Invalid time";
          timeElementH.classList.add("errorBorder");
          badFields = true;
        }
        if (isNaN(timeElementMValue)) {
          timeElapsedError.textContent = "Invalid time";
          timeElementM.classList.add("errorBorder");
          badFields = true;
        }
        if (isNaN(timeElementSValue)) {
          timeElapsedError.textContent = "Invalid time";
          timeElementS.classList.add("errorBorder");
          badFields = true;
        }
        if (timeElementHValue.length > 2) {
          timeElapsedError.textContent = "Invalid time";
          timeElementH.classList.add("errorBorder");
          badFields = true;
        }
        if (timeElementMValue.length > 2) {
          timeElapsedError.textContent = "Invalid time";
          timeElementM.classList.add("errorBorder");
          badFields = true;
        }
        if (timeElementSValue.length > 2) {
          timeElapsedError.textContent = "Invalid time";
          timeElementS.classList.add("errorBorder");
          badFields = true;
        }
      }

      ////////
      if (badFields === true) {
        return false;
      } else {
        return true;
      }
    }

    return;
  }
});
