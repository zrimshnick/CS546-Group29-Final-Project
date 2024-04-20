import { Router } from "express";
const router = Router();
import {
  createWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from "../data/workouts.js";

router.route("/").get(async (req, res) => {
  res.render("workoutsPage", { title: "Tracklete | Workouts" });
});

/* router.route("/workouts").get(async (req, res) => {
  res.render("workoutsPage");
}); */

export default router;
