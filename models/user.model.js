const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    class:{
        type:String
    },
    section:{
        type:String
    },
    image:{
        types:String,
    },
    status:{
        type:Boolean,
    },
    role:{
        type:String,
    },
    credits:{
        type:Number,
    },
    contactNumber:{
        type:String
    },
    address:{
        type:String
    },
    gender:{
        type:String
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }
});

const user=mongoose.model('User',userSchema);
module.exports=user;