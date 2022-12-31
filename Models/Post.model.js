const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title : {type : String, require : true},
        description : {type : String},
        createdby : {type : String, require : true},
        shortDesc : {type : String},
        headerImage : {type : String}
    },{
        timestamps : true,
        versionKey : false
    }
    );  

const PostModel = mongoose.model("Post", PostSchema, "posts");

module.exports = PostModel;
    