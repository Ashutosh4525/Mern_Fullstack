import dotenv from "dotenv";
dotenv.config();
    // {
    // path:'./.env'
// }

import connectDB from "./DB/db.js";
import { app } from "./app.js";
// dotenv.config({
//     path:'./.env'
// });
const PORT = process.env.PORT || 8000;
connectDB()
.then(()=>{
     app.listen(PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
    process.exit(1);
})




