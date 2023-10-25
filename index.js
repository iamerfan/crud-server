require("dotenv").config();
const express = require("express");
const { ConnectToDatabase } = require("./db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.listen(port, () => console.log(`Server is running on port ${port}`));

//  API's //

//home
app.get("/api/items", async (req, res) => {
  const { connect, close, db } = await ConnectToDatabase();
  await connect();
  const items = db.collection("items");
  try {
    const result = await items.find({}).toArray();
    return res.json(result);
  } catch (error) {
    console.log(error);
  } finally {
    await close();
  }
});

app.post("/api/items", async (req, res) => {
  const body = req.body;
  const { connect, close, db } = await ConnectToDatabase();
  await connect();
  const items = db.collection("items");
  try {
    const result = await items.insertOne({ ...body });
    return res.json(result);
  } catch (error) {
    console.log(error);
  } finally {
    await close();
  }
});
app.delete("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  const { connect, close, db } = await ConnectToDatabase();
  await connect();
  const items = db.collection("items");
  try {
    const result = await items.deleteOne({ id });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  } finally {
    await close();
  }
});
app.put("/api/items/:id/:value", async (req, res) => {
  const { id, value } = req.params;
  const { connect, close, db } = await ConnectToDatabase();
  await connect();
  const items = db.collection("items");
  try {
    const result = await items.findOneAndUpdate({ id }, { $set: { value } });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  } finally {
    await close();
  }
});
