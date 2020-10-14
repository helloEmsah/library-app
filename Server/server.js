const express = require("express");

const cors = require("cors");

const app = express();

require("dotenv").config();

const router = require("./routes/index");

app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
