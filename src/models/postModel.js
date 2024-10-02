import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        data:{
            type:String,
            required:[true,'Please provide a valid data'],
        }
    },
    { timestamps: true }
)

const Post = mongoose.models.posts || mongoose.model('posts',postSchema);

export default Post;