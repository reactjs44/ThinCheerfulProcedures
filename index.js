import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";
import User from "./models/user.model.js";
import userRoutes from "./routes/user.routes.js";
import passport from "passport";
import passportLocal from "passport-local";

const app = express();

// Middleware
app.use(bodyParser.json());

// Passport Configuration
passport.use(
  new passportLocal.Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const passwordMatch = user.password === password;

      if (passwordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password not matched" });
      }
    } catch (error) {
      return done(error);
    }
  }),
);

// Initialize Passport Middleware
app.use(passport.initialize());

// Routes
app.use("/user", userRoutes);

// app.get("/", (req, res) => {
//   res.send("new server is running");
// });

const loacalAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", loacalAuthMiddleware, (req, res) => {
  res.send("Server is running");
});

// Start the server
app.listen(3000, () => {
  console.log("Express server initialized");
});
