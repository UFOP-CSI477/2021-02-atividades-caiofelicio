import "express-async-errors"
import app from "./app";
import dotenv from "dotenv"
import createConnection from "./database/createConnection"

createConnection()

dotenv.config()

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333!");
})