const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log("DB connected ok");
  } catch (error) {
    console.log(error);
  }
};

dbConnection();
