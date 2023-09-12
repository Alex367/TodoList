import { connectToDatabase } from "@/lib/db";
import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const data = req.body;
    const { oldPassword, newPassword } = data;

    if (oldPassword === newPassword || newPassword.trim().length < 3) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const session = await getServerSession(req, res);

    if (!session) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const userEmail = session.user.email;

    const client = await connectToDatabase();
    const collection = await client.db(process.env.DB_TITLE).collection(process.env.DB_DATA_USER);

    const user = await collection.findOne({ email: userEmail }); // find user by email

    if (!user) {
      res.status(404).json({ message: "User not found" });
      client.close();
      return;
    }

    const databasePassword = user.password;

    //compare pass

    const isValid = await compare(oldPassword, databasePassword);
    if (!isValid) {
      res.status(403).json({ message: "Invalid password" });
      client.close();
      return;
    }

    const hashedPassword = await hash(newPassword, 12);
    await collection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );

    client.close();
    res.status(200).json({ message: "Password is updated!" });
  }
}
