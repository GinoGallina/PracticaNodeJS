import '../src/config/env.js'
import connectDB from "./config/db.js";
import  httpServer  from "../src/config/http.js";

console.clear();
// dotenv.config();



const comienzo= async ()=>{
  // await mongoose.connect(process.env.MONGODB_URL);
  await connectDB(process.env.MONGODB_URL);
  httpServer.listen(process.env.PORT,()=>{
    console.log(`Server está corriendo en puerto ${process.env.PORT}`)
});
}

comienzo();