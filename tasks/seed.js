import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import * as users from "../data/users.js";
import * as workouts from "../data/workouts.js";
import * as exercises from "../data/exercise.js";

const db = await dbConnection();
await db.dropDatabase();

const user1 = await users.createUser(
  "tlapinta",
  "Thomas",
  "LaPinta",
  "tlapinta@stevens.edu",
  "Abc1234#",
  "m",
  ["baseball"],
  "6'2\"",
  "standard",
  "175",
  "lbs"
);
console.log(user1);

const user2 = await users.createUser(
  "philliam",
  "Patrick",
  "Hill",
  "phill@stevens.edu",
  "Pword@!111",
  "m",
  ["football", "soccer"],
  "5'10\"",
  "standard",
  "160",
  "lbs"
);

console.log(user2);

const user3 = await users.createUser(
  "jRand586",
  "Jules",
  "Random",
  "jrandom@gmail.com",
  "123Rand!#**",
  "f",
  ["tennis"],
  "5'17\"",
  "standard",
  "120",
  "lbs"
);

console.log(user3);

const user4 = await users.createUser(
  "zrimshnick25",
  "Zack",
  "Rimshnick",
  "zrimshnick@gmail.com",
  "Pa$$word123",
  "m",
  ["baseball"],
  "5'10\"",
  "standard",
  "180",
  "lbs"
);

console.log(user4);

// Use to test other user data functions besides createUser
// try {
//     const getUser3 = await users.getUser(user3._id.toString());
//     console.log(getUser3);
// } catch (e){
//     console.log(e);
// }

// console.log(await users.deleteUser(user3._id.toString()));

// try{
//     console.log(await users.updateUser(user1._id.toString(), {username: 'tlapinta42', lastName: 'LaPinta-Caracciolo'}))
// } catch (e){
//     console.log(e);
// }

let workout1 = undefined;
let workout2 = undefined;
let workout3 = undefined;
let workout4 = undefined;

try {
  workout1 = await workouts.createWorkout(
    user1._id.toString(),
    "04/09/2024",
    "01:05:25",
    "Weight Training",
    200
  );
  console.log(workout1);
} catch (e) {
  console.log(e);
}
try {
  workout2 = await workouts.createWorkout(
    user2._id.toString(),
    "04/01/2024",
    "00:30:00",
    "Cardio",
    150
  );
  console.log(workout2);
} catch (e) {
  console.log(e);
}
try {
  workout3 = await workouts.createWorkout(
    user4._id.toString(),
    "04/13/2024",
    "00:33:00",
    "Cardio",
    175
  );
  console.log(workout3);
} catch (e) {
  console.log(e);
}
try {
  workout4 = await workouts.createWorkout(
    user4._id.toString(),
    "04/13/2024",
    "01:15:45",
    "Weight Training",
    205
  );
  console.log(workout4);
} catch (e) {
  console.log(e);
}
//use to test other data functions like getWorkout, deleteWorkout, and updateWorkout
// try{
//     const get = await workouts.getWorkout(workout1._id.toString());
//     console.log(get);
// }catch(e){
//     console.log(e);
// }

// try {
//     const d = await workouts.deleteWorkout(workout1._id.toString());
//     console.log(d);
// } catch (e) {
//     console.log(e);
// }

// try{
//     const u = await workouts.updateWorkout(workout1._id.toString(), {caloriesBurned: 100});
//     console.log(u);
// }catch(e){
//     console.log(e);
// }

//exercises

let exercise1 = undefined;
let exercise2 = undefined;
let exercise3 = undefined;
let exercise4 = undefined;
let exercise5 = undefined;
let exercise6 = undefined;
let exercise7 = undefined;
let exercise8 = undefined;
let exercise9 = undefined;

try {
  exercise1 = await exercises.createExercise(
    workout1._id.toString(),
    "weight training",
    "Bench Press",
    3,
    [8, 8, 6],
    225,
    "lbs",
    0,
    "n/a",
    "00:14:31",
    "I felt really loose today with no pain"
  );
  console.log(exercise1);
} catch (e) {
  console.log(e);
}
try {
  exercise2 = await exercises.createExercise(
    workout1._id.toString(),
    "weight training",
    "Squat",
    3,
    [10, 8, 8],
    205,
    "lbs",
    0,
    "n/a",
    "00:10:45",
    "I was able to keep good form and reach good depth"
  );
  console.log(exercise2);
} catch (e) {
  console.log(e);
}
try {
  exercise3 = await exercises.createExercise(
    workout2._id.toString(),
    "cardio",
    "Run",
    0,
    [],
    0,
    "n/a",
    1.5,
    "mi",
    "00:14:31",
    "My wrists bothered me today"
  );
  console.log(exercise3);
} catch (e) {
  console.log(3);
}

try {
  exercise4 = await exercises.createExercise(
    workout3._id.toString(),
    "cardio",
    "Run",
    0,
    [],
    0,
    "n/a",
    2,
    "mi",
    "00:20:31",
    "My knees were hurting today"
  );
  console.log(exercise4);
} catch (e) {
  console.log(3);
}
try {
  exercise5 = await exercises.createExercise(
    workout3._id.toString(),
    "cardio",
    "Run",
    0,
    [],
    0,
    "n/a",
    1,
    "mi",
    "00:10:31",
    "My knees were hurting less on my jog"
  );
  console.log(exercise5);
} catch (e) {
  console.log(3);
}

try {
  exercise6 = await exercises.createExercise(
    workout4._id.toString(),
    "weight training",
    "Bench Press",
    3,
    [8, 8, 6],
    225,
    "lbs",
    0,
    "n/a",
    "00:14:31",
    "Shoulder felt good"
  );
  console.log(exercise6);
} catch (e) {
  console.log(e);
}

try {
  exercise7 = await exercises.createExercise(
    workout4._id.toString(),
    "weight training",
    "Bicep Curls",
    3,
    [10, 10, 10],
    35,
    "lbs",
    0,
    "n/a",
    "00:10:31",
    "Elbow felt good"
  );
  console.log(exercise7);
} catch (e) {
  console.log(e);
}

try {
  exercise8 = await exercises.createExercise(
    workout4._id.toString(),
    "weight training",
    "Shoulder Press",
    3,
    [10, 10, 10],
    65,
    "lbs",
    0,
    "n/a",
    "00:10:31",
    "Shoulder felt good"
  );
  console.log(exercise8);
} catch (e) {
  console.log(e);
}

try {
  exercise9 = await exercises.createExercise(
    workout4._id.toString(),
    "weight training",
    "Tricep Press",
    3,
    [10, 10, 10],
    35,
    "lbs",
    0,
    "n/a",
    "00:14:31",
    "Elbow felt good"
  );
  console.log(exercise9);
} catch (e) {
  console.log(e);
}

//use to test other data functions
// try{
//     const get = await exercises.getAllExercises(workout1._id.toString());
//     console.log(get);
// }catch(e){
//     console.log(e);
// }
// try{
//     const get1 = await exercises.getExercise(exercise1._id.toString());
//     console.log(get1);
// }catch(e){
//     console.log(e);
// }
// try{
//     const d = await exercises.deleteExercise(exercise1._id.toString());
//     console.log(d);
// }catch(e){
//     console.log(e);
// }
console.log("Done seeding database");

await closeConnection();
