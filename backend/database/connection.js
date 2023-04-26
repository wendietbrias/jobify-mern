import mongoose from "mongoose";

const connectDB = async (app, port) => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URI}`);

        if(connect) {
           if(typeof app == "function" && typeof port == "number") {
            app.listen(port, () => console.log(`runnin on port : ${port}`));
           }
        }
    } catch(err) {
        return err.message;
    }
}

export default connectDB;