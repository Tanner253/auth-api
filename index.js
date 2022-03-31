"use strict";



//combination of loading models db and user roles "models" db


const server = require("./src/server.js");
require("dotenv").config();
const { db } = require("./src/models");
const { authDb } = require("./src/auth/models");

db.sync().then(() => {
  authDb.sync().then(() => {
    server.start(process.env.PORT || 3000);
  });
});
