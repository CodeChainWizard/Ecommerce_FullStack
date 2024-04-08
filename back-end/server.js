const expres = require("express");
const dbConnection = require("./db/dbConnction.js");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// const cors = require("cors");

const app = expres();
app.use(expres.json());
app.use(cookieParser());
// app.use(expres.cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});

// Rouets
app.use("/user", require("./rotues/useRoute"));
app.use("/api", require("./rotues/categoryRoute"));
app.use("/api", require("./rotues/uplaod"));
app.use("/api", require("./rotues/productRoute"));

// Connection MongoDB
dbConnection()
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.log(err));
