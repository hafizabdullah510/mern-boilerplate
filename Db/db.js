import mongoose from "mongoose";
const Connection = (url) => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("Connected to the database ");
    })
    .catch((err) => {
      console.log(`Error connecting to the database.`);
    });
};
export default Connection;
