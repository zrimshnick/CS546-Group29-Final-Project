import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import * as users from "../data/users.js";
import * as workouts from "../data/workouts.js";
import * as exercises from "../data/exercise.js";
import * as posts from "../data/posts.js";
import * as comments from "../data/comments.js";

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
  "lbs",
  21
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
  "lbs",
  45
);

console.log(user2);

const user3 = await users.createUser(
  "jRando",
  "Jules",
  "Random",
  "jrandom@gmail.com",
  "123Rand!#**",
  "f",
  ["tennis"],
  "5'10\"",
  "standard",
  "120",
  "lbs",
  38
);

console.log(user3);

const user4 = await users.createUser(
  "zrimshni",
  "Zack",
  "Rimshnick",
  "zrimshnick@gmail.com",
  "PA$$W0RD",
  "m",
  ["baseball"],
  "5'10\"",
  "standard",
  "180",
  "lbs",
  21
);

console.log(user4);

const user5 = await users.createUser(
  "smaida",
  "Sean",
  "Maida",
  "smaida@stevens.edu",
  "Yankees$22",
  "m",
  ["baseball"],
  "6'2'",
  "standard",
  "140",
  "lbs",
  21
);

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
let workout5 = undefined;
let workout6 = undefined;

try {
  workout1 = await workouts.createWorkout(
    user1._id.toString(),
    "04/09/2024",
    "01:05:25",
    "Weight Training",
    200,
    "I felt really loose today with no pain"
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
    150,
    "I kept a good pace throughout my run"
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
    175,
    'My knees were hurting today'
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
    205,
    "Shoulder felt good"
  );
  console.log(workout4);
} catch (e) {
  console.log(e);
}

try {
  workout5 = await workouts.createWorkout(
    user4._id.toString(),
    "4/16/2024",
    "00:50:00",
    "Weight Training",
    200,
    "Knees felt good"
  );
  console.log(workout4);
} catch (e) {
  console.log(e);
}

try {
  workout6 = await workouts.createWorkout(
    user4._id.toString(),
    "04/20/2024",
    "00:35:00",
    "Cardio",
    120,
    "I was able to keep a good pace"
  );
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
let exercise10 = undefined;
let exercise11 = undefined;
let exercise12 = undefined;
let exercise13 = undefined;
let exercise14 = undefined;
let exercise15 = undefined;

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
    "00:14:31"
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
    "00:10:45"
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
    "00:14:31"
  );
  console.log(exercise3);
} catch (e) {
  console.log(e);
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
    "00:20:31"
  );
  console.log(exercise4);
} catch (e) {
  console.log(e);
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
    "00:10:31"
  );
  console.log(exercise5);
} catch (e) {
  console.log(e);
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
    "00:14:31"
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
    "00:10:31"
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
    "00:10:31"
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
    "00:14:31"
  );
  console.log(exercise9);
} catch (e) {
  console.log(e);
}

try {
  exercise10 = await exercises.createExercise(
    workout5._id.toString(),
    "weight training",
    "Linear Leg Press",
    3,
    [9, 9, 8],
    388,
    "lbs",
    0,
    "n/a",
    "00:10:00"
  );
  console.log(exercise10);
} catch (e) {
  console.log(e);
}

try {
  exercise11 = await exercises.createExercise(
    workout5._id.toString(),
    "weight training",
    "Seated Leg Curles",
    3,
    [9, 8, 7],
    90,
    "lbs",
    0,
    "n/a",
    "00:10:00",
    "Hamstrings felt good"
  );
  console.log(exercise11);
} catch (e) {
  console.log(e);
}

try {
  exercise12 = await exercises.createExercise(
    workout5._id.toString(),
    "weight training",
    "Squats",
    4,
    [8, 8, 8, 6],
    145,
    "lbs",
    0,
    "n/a",
    "00:10:00"
  );
  console.log(exercise12);
} catch (e) {
  console.log(e);
}

try {
  exercise13 = await exercises.createExercise(
    workout5._id.toString(),
    "weight training",
    "Leg Extensions",
    3,
    [10, 10, 8],
    105,
    "lbs",
    0,
    "n/a",
    "00:10:00"
  );
  console.log(exercise13);
} catch (e) {
  console.log(e);
}

try {
  exercise14 = await exercises.createExercise(
    workout5._id.toString(),
    "weight training",
    "Calf Raises",
    3,
    [10, 10, 10],
    35,
    "lbs",
    0,
    "n/a",
    "00:10:00",
    "n/a"
  );
  console.log(exercise14);
} catch (e) {
  console.log(e);
}

try {
  exercise15 = await exercises.createExercise(
    workout6._id.toString(),
    "Cardio",
    "Running on Treadmill",
    0,
    [],
    0,
    "lbs",
    2,
    "mi",
    "00:35:00"
  );
  console.log(exercise15);
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

let post1 = undefined;
let post2 = undefined;
let post3 = undefined;

try {
  post1 = await posts.createPost(
    user4._id.toString(),
    workout4._id.toString(),
    ["weight", "baseball"]
  );
  await posts.likePost(post1._id.toString(), user1._id.toString());
  await posts.likePost(post1._id.toString(), user2._id.toString());
  console.log(post1);
} catch (e) {
  console.log(e);
}

try {
  post2 = await posts.createPost(
    user4._id.toString(),
    workout5._id.toString(),
    ["weight", "baseball", "legs"]
  );
  await posts.likePost(post2._id.toString(), user3._id.toString());
  await posts.likePost(post2._id.toString(), user2._id.toString());
  console.log(post2);
} catch (e) {
  console.log(e);
}

try {
  post3 = await posts.createPost(
    user4._id.toString(),
    workout6._id.toString(),
    ["running", "baseball"]
  );
  await posts.likePost(post3._id.toString(), user3._id.toString());
  await posts.likePost(post3._id.toString(), user1._id.toString());
  await posts.likePost(post3._id.toString(), user2._id.toString());
  console.log(post3);
} catch (e) {
  console.log(e);
}

let comment1 = undefined;
let comment2 = undefined;
let comment3 = undefined;
try {
  comment1 = await comments.createComment(
    "tlapinta",
    "I like your workout plan",
    post1._id.toString()
  );
  comment2 = await comments.createComment(
    "philliam",
    "I am going to use this in my next workout",
    post1._id.toString()
  );
  console.log(comment1);
  console.log(comment2);
} catch (e) {
  console.log(e);
}

try {
  comment3 = await comments.createComment(
    "philliam",
    "I like your leg day routine. I might use it.",
    post2._id.toString()
  );
  console.log(comment3);
} catch (e) {
  console.log(e);
}

//use to test other data functions like updateComment

// try{
//   let d = await comments.updateComment(comment2._id.toString(), {comment: 'I like this idea'});
//   console.log(d);
// }catch(e){
//   console.log(e);
// }
console.log("Done seeding database");

await closeConnection();
