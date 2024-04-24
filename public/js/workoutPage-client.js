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
          <input id="caloriesBurned" name="caloriesBurned" type="text" class="workouts-workout-cals"></input>
        </div>
      <div class="workouts-workout-subtitle">
        <input id="date" name="date" type="text" class="workouts-workout-date"></input>
        <input id="timeElapsed" name="timeElapsed" type="text" class="workouts-workout-time"></input>
      </div>
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

        <div class="workouts-workout-exercise-grid-item grid-exercise">EXERCISE NAME</div>
        <div class="workouts-workout-exercise-grid-item grid-sets">
            SETS
        </div>
        <div class="workouts-workout-exercise-grid-item grid-reps">
            REPS
        </div>
        <div class="workouts-workout-exercise-grid-item grid-weight">
            WEIGHT
        </div>

    </div>
    <div class="workouts-workout-button-container">
        <button class="workouts-workout-delete-button flex">
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
    return;
  }
});
