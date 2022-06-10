import mongoose from "mongoose";

function createConnection() {
  mongoose.connect("mongodb://localhost:27017/trabalho");
}

export default createConnection;
