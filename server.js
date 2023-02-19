const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.port || 3002;
const authRouter = require("./src/routes/auth.routes");
const destinationRouter = require("./src/routes/traveldestinations.routes");

// auto-refresh server on file changes: https://www.npmjs.com/package/@types/nodemon
app.use(express.json());
app.use(cors());

/*----------- CONNECT TO MONGODB ATLAS CLUSTER ------------------
---------------------------------------------------------------*/
const connectionStringAtlas = process.env.mongooseAtlasConnectionString;

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    connectionStringAtlas,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );
} catch (err) {
  console.log("could not connect");
}

/*---------------------- PASSPORT STRATEGY ---------------------
---------------------------------------------------------------*/
require("./src/configs/passport.config");
app.use(passport.initialize());

/*-------------------------- ROUTES ----------------------------
---------------------------------------------------------------*/
app.use("/auth", authRouter);
app.use("/destinations", destinationRouter);

/*-------------------- APP LISTENS ON PORT ---------------------
---------------------------------------------------------------*/
app.listen(port, () => {
  console.log(`Travel destinations app listening on port ${port}`);
});
