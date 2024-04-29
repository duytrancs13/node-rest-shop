const mongoose = require("mongoose");

module.exports = dbConnect = () => {
  mongoose.connect(process.env.DB);

  mongoose.connection.on("connected", () =>
    console.log("Connected to database successfully")
  );
  mongoose.connection.on("error", (error) =>
    console.log("Error while connecting to database :", error)
  );
  mongoose.connection.on("disconnected", (error) =>
    console.log("Mongodb connection disconnected")
  );
};
