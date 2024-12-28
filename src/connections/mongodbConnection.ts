
import {connect ,disconnect} from "mongoose";
export const connectToMongodb =async ()=>{
    try{
        await connect(process.env.MONGODB_URL);
    }
    catch(error){
        console.log(error);
    
    throw new Error("Unable to connect");
    }
}

async function disconnectFromDatabase(){
try{
       await disconnect();
     } catch(error){
        console.log(error);  
        throw new Error("Unable to connect");
     }
}

export default  {connectToMongodb ,disconnectFromDatabase}