const expres = require("express");
const dbConnection = require("./db/dbConnction.js");
const cookieParser = require("cookie-parser");

const app = expres();
app.use(expres.json());
app.use("/user", require("./rotues/useRoute"));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});

// Connection MongoDB
dbConnection()
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.log(err));
