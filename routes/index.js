import workoutRoutes from "./workouts.js";

const constructorMethod = (app) => {
  app.use("/", workoutRoutes);
  app.use("*", (req, res) => {
    /* res.status(404).json({ error: "Route not found" }); */
    const errorMessage = `404 Error: Route not found`;
    res.status(404).render("error", { errorMessage });
  });
};

export default constructorMethod;
