import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "bson";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the db failed!" });
      return;
    }

    // validation inputs

    const collection = await client.db(process.env.DB_TITLE).collection(process.env.DB_DATA_COLLECTION);

    await collection.insertOne(data);
    client.close();
    res.status(201).json({ message: "Task is added", data });
  } else if (req.method === "DELETE") {
    const data = req.body;

    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the db failed!" });
      return;
    }

    // validation

    const collection = await client.db(process.env.DB_TITLE).collection(process.env.DB_DATA_COLLECTION);

    const transformedData = data.map((item) => new ObjectId(item));
    try {
      await collection.deleteMany({ _id: { $in: transformedData } });
    } catch (e) {
      // console.log(e);
    }
    client.close();
    res.status(201).json({ message: "Tasks are deleted", data });
  } else if (req.method === "GET") {
    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the db failed!" });
      return;
    }

    const collection = await client.db(process.env.DB_TITLE).collection(process.env.DB_DATA_COLLECTION);

    const data = await collection.find({}).toArray();

    client.close();
    res.status(201).json({ message: "Data is received", data });
  } else if (req.method === "PUT") {
    const data = req.body;

    let client;
    try {
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the db failed!" });
      return;
    }

    const collection = await client.db(process.env.DB_TITLE).collection(process.env.DB_DATA_COLLECTION);

    // transfort from id with string format into _id with object format
    data.id = new ObjectId(data.id);
    delete Object.assign(data, { ["_id"]: data["id"] })["id"];

    await collection.replaceOne({ _id: data._id }, { ...data });

    client.close();
    res.status(201).json({ message: "Task is updated!" });
  }
}
