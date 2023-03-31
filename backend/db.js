const mongoose = require("mongoose");
const mongoosUri="mongodb://localhost:27017/inotebook";

const connectToMongoose=()=>{
    mongoose.connect(mongoosUri,()=> {
    });
}

module.exports= connectToMongoose;