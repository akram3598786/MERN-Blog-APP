const mongoose = require("mongoose");

const PublishPostSchema = new mongoose.Schema(
    {
        title : {type : String, require : true},
        description : {type : String},
        user:{type : String},
        createdby : {type : String, require : true},
        shortDesc : {type : String},
        avatar : {type : String},
        headerImage : {type : String},
        curDate : {type : String}
    },{
        timestamps : true,
        versionKey : false
    }
    );  

const PublishPostModel = mongoose.model("PublishedPost", PublishPostSchema, "publishedPosts");

module.exports = PublishPostModel;