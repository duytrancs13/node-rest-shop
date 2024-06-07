const mongoose = require("mongoose");

module.exports = dbConnect = async () => {
  await mongoose.connect(process.env.DB, { useNewUrlParser: true });

  mongoose.connection.on("connected", () => console.log("Database connected"));
  mongoose.connection.on("error", (error) =>
    console.log("Database error :", error)
  );
  mongoose.connection.on("disconnected", (error) =>
    console.log("Database disconnected")
  );
};
