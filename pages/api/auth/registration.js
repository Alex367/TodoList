import { connectToDatabase } from "@/lib/db";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password, repeatedPassword } = data;

    //Validation
    if (
      password !== repeatedPassword ||
      !email ||
      !password ||
      !repeatedPassword ||
      !email.includes("@") ||
      password.trim().length < 3
    ) {
      res.status(422).json({ message: "Something with inputs" });
      return;
    }
    const client = await connectToDatabase();
    const collection = await client.db(process.env.DB_TITLE).collection(process.env.DB_DATA_USER);

    // if this email already existed
    let result;
    try {
      result = await collection.findOne({ email: email });
    } catch (error) {
      res.status(422).json({ message: "Something went wrong" });
      client.close;
      return;
    }

    if (result) {
      res.status(422).json({ message: "User existed already" });
      client.close();
      return;
    }

    const hashedPassword = await hash(password, 12);

    await collection.insertOne({ email, password: hashedPassword });

    client.close();
    res.status(201).json({ message: "User was created!" });
  }
}
