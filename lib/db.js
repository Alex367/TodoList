import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    process.env.DB_PATH
  );

  return client;
}

// const DUMMY_DATA = [
//   {
//     id: 1,
//     title: "Landing page design",
//     description: "Would be good if we could add more",
//     date: "10-10-2020",
//     author: "Boris Petrov",
//   },
//   {
//     id: 2,
//     title: "Landing page design2",
//     description: "Would be good if we could add more",
//     date: "10-10-2020",
//     author: "Boris Petrov",
//   },
//   {
//     id: 3,
//     title: "Landing page design3",
//     description: "Would be good if we could add more",
//     date: "10-10-2020",
//     author: "Boris Petrov",
//   },
// ];