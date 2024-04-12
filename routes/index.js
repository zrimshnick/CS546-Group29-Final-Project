import workoutRoutes from "./workouts.js";
import profileRoutes from "./users.js";
import homeRoutes from "./home.js";
import path from "path";

const constructorMethod = (app) => {
  app.use("/", homeRoutes);
  app.use("/workouts", workoutRoutes);
  app.use("/profile", profileRoutes);
  app.use("*", (req, res) => {
    /* res.status(404).json({ error: "Route not found" }); */
    const errorMessage = `404 Error: Route not found`;
    res.status(404).render("error", { errorMessage });
  });
};

export default constructorMethod;
