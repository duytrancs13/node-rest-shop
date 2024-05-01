const mongoose = require("mongoose");

module.exports = dbConnect = () => {
  // DB
  mongoose.connect(
    "mongodb+srv://duytrancs13:hipesoqa@node-tuts.k3ee6rq.mongodb.net/p-studio?retryWrites=true&w=majority"
  );

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
