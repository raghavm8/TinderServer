import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    name:String,
    ImgUrl:String
})

export default mongoose.model('cards',cardSchema);