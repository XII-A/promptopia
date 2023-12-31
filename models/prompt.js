
import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    prompt: {
        type:String,
        require:[true,'Prompt is required.']
    },
    tag:{
        type: String,
        require: [true,'Tag is required.'],
    }
});

const Prompt = models.Prompt || model('Prompt',PromptSchema);
export default Prompt;