import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:[true,'Please provide a valid userId'],
        },
        assignedTo: {
            type: [{
                type: String,
                required: true,  // This will ensure each string is required
            }],
            validate: {
                validator: function (v) {
                    return v.length > 0; // Ensures the array has at least one assignee
                },
                message: 'Please provide at least one valid assignee'
            }
        },
        todo:{
            type:String,
            required:[true,'Please provide a valid data'],
        },
        comments: {
            type: [{
                userId: {
                    type: String,
                    required: [true, 'Please provide a valid userId for the comment'],
                },
                comment: {
                    type: String,
                    required: [true, 'Please provide a valid comment'],
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                }
            }]
        },
        end_date:{
            type:Date,
            required:[true,'Please Provide a valid Date']
        },
        status:{
            type:String,
            required:[true,'Status Required']
        }
    },
    { timestamps: true }
)

const Post = mongoose.models.posts || mongoose.model('posts',postSchema);

export default Post;