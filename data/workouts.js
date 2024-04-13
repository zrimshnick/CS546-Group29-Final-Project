//Location of all of the workouts data functions
import { ObjectId } from "mongodb";
import { workouts } from "../config/mongoCollections.js";
import { users } from "../config/mongoCollections.js";
import {
  checkString,
  checkArray,
  checkNumber,
  checkID,
  checkDate,
  checkTime,
} from "../helpers.js";

export const createWorkout = async (
  userID,
  date,
  timeElapsed,
  workoutType,
  caloriesBurned
) => {
  //Error checking
  if (
    userID === undefined ||
    date === undefined ||
    timeElapsed === undefined ||
    workoutType === undefined ||
    caloriesBurned === undefined
  ) {
    throw `Error: all fields need to be supplied`;
  }
  userID = checkID(userID, "userID");
  checkDate(date, "date");
  date = date.trim();
  checkTime(timeElapsed, "timeElapsed");
  timeElapsed = timeElapsed.trim();
  checkString(workoutType, "workoutType");
  workoutType = workoutType.trim();
  checkNumber(caloriesBurned, "caloriesBurned");

  const workoutCollection = await workouts();
  let workout = {
    userID: userID,
    date: date,
    timeElapsed: timeElapsed,
    workoutType: workoutType,
    caloriesBurned: caloriesBurned,
    exercises: [],
  };
  const insertInfo = await workoutCollection.insertOne(workout);
  workout._id = insertInfo.insertedId.toString();
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw `Error: could not add workout`;
  }

  const userCollection = await users();
  const user = await userCollection.findOneAndUpdate(
    { _id: new ObjectId(userID) },
    { $push: { workouts: workout._id } },
    { returnDocument: "after" }
  );
  if (user === null) {
    throw "No user with that id.";
  }

  return workout;
};

export const getWorkout = async (id) => {
  if (id === undefined) {
    throw `Error: workoutID not provided`;
  }
  checkString(id, "workoutID");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw `Error: workoutID is not a valid ObjectId`;
  }
  const workoutCollection = await workouts();
  const w = await workoutCollection.findOne({ _id: new ObjectId(id) });
  if (w === null) {
    throw `Error: no workout with that id`;
  }
  w._id = w._id.toString();
  return w;
};

export const deleteWorkout = async (id) => {
  if (id === undefined) {
    throw `Error: id not provided`;
  }
  checkString(id, "workoutId");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw `Error: id is not a valid ObjectId`;
  }

  const workoutCollection = await workouts();
  const deleteInfo = await workoutCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (!deleteInfo) {
    throw `Error: Could not delete workout with id of ${id}`;
  }
  return `Successfully deleted workout with id ${id}`;
};

export const updateWorkout = async (id, updateObject) => {
  if (id === undefined) {
    throw `Error: workoutID not provided`;
  }
  checkString(id, "workoutID");
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw `Error: workoutID is not a valid ObjectId`;
  }

  const workoutCollection = await workouts();
  let workout = await workoutCollection.findOne({ _id: new ObjectId(id) });
  if (workout === null) {
    throw `Error: no workout with that id`;
  }
  if (updateObject.userID) {
    updateObject.userID = checkID(updateObject.userID, "userID");
    workout.userID = updateObject.userID;
  }
  if (updateObject.date) {
    checkDate(updateObject.date, "date");
    workout.date = updateObject.date.trim();
  }
  if (updateObject.timeElapsed) {
    checkTime(updateObject.time, "timeElapsed");
    workout.timeElapsed = updateObject.timeElapsed.trim();
  }
  if (updateObject.workoutType) {
    checkString(updateObject.workoutType, "workoutType");
    workout.workoutType = updateObject.workoutType.trim();
  }
  if (updateObject.caloriesBurned) {
    checkNumber(updateObject.caloriesBurned, "caloriesBurned");
    workout.caloriesBurned = updateObject.caloriesBurned;
  }

  await workoutCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: workout },
    { returnDocument: "after" }
  );
  if (workout === null) {
    throw `Error: no workout with that id`;
  }
  workout._id = workout._id.toString();
  return workout;
};
