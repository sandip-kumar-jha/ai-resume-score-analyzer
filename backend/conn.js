const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sandipjha654_db_user:vmFCYAlxuFvDN89e@cluster0.zwqlhd7.mongodb.net/?appName=Cluster0').then((res)=>{
    console.log("Database Connected Successfully")
}).catch(err=>{
    console.log("Something Error,",err)
})