const express=require("express");
 const mongoose=require("mongoose");
   const bodyparser=require("body-parser")
    const cors=require("cors");
      const adminRouter=require("../backend/router/adminRouter")
      const noticationRouter=require("../backend/router/notificationRoutes")
      // replay route
      const notificationRoutes = require('../backend/router/adminMsgRouter');
      
      const userRouter=require("./router/userRouter");
      require('dotenv').config({'path':'./.env'});
      const env=require('dotenv');


const app=express();
const PORT=5000;
app.use(bodyparser.json())
app.use(cors());
app.use("/admin",adminRouter)
app.use("/user",userRouter)
app.use("/notification",noticationRouter)

//  Admin replay route
app.use('/notification', notificationRoutes);
 
// mongoDb  connection 


mongoose.connect("mongodb://127.0.0.1:27017/scarpmanagment",{

}).then(()=>{
      console.log("mongooos connected")
    }).catch((error) => {
        console.error("Error occurred:", error);
    });
    



app.listen(PORT,()=>{
       console.log("Your server running")
})