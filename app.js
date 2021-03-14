require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = process.env.mongourl;
var cors = require("cors");
app.use(cors());
mongoose
  .connect(uri, () => console.log("App Db success"))
  .catch((err) => console.log(err));

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", require("./routes/user"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(process.env.PORT || 3900, (e) => {
  console.log(e);
});
