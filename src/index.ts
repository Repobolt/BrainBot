import app from "./app.js";
import { connectToMongodb } from "./connections/mongodbConnection.js";


//connect

connectToMongodb().then(()=>{
  app.listen(5878,()=>console.log("mahadeva🤞 connected "))
})
 
.catch((err)=>console.log(err))
 
