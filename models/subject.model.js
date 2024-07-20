const mongoose=require('mongoose');

const subjectSchema=mongoose.Schema({
    subjectId:{
        type:String,
    },
    subjectName:{
        type:String,
    },
    image:{
        type:String
    },
    status:{
        type:Boolean,
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

const subject=mongoose.model('Subject',subjectSchema);
module.exports=subject;