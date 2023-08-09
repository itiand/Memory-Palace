import mongoose from 'mongoose';

const memoryPalaceSchema = new mongoose.Schema({
  name: String,
  front_img_url: String,
  rooms: [Object]
});

const MemoryPalace = mongoose.model('MemoryPalace', memoryPalaceSchema)

export default MemoryPalace