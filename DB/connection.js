const mongoose = require("mongoose");

const DBConnection = () => {
  //sessiondbv1
  //sessiondvv12144
  mongoose
    .connect(
      "mongodb+srv://sessiondbv1:sessiondvv12144@cluster0.j2maqc3.mongodb.net/senwell-session-db-v1"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = DBConnection;
