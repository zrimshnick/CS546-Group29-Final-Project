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
      <div class="workouts-workout-subtitle">
        <input id="date" name="date" type="date" class="workouts-workout-date"></input>
        <div class=workouts-workout-time>
            Time Elapsed:
            <input id="timeElapsedH" name="timeElapsedH" type="text" placeholder="HH" >:</input>
            <input id="timeElapsedM" name="timeElapsedM" type="text" placeholder="MM" >:</input>
            <input id="timeElapsedS" name="timeElapsedS" type="text" placeholder="SS" ></input>
        </div>
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

    return;
  }
});
