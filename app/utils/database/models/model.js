import  mongoose  from "mongoose";

const subTaskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  taskDesc: {
    type: String,
    required: true,
  },
  imp: {
    type: Number,
    default: 0, 
  },
  comp: {
    type: Number,
    default: 0, 
  },
  archive: {
    type: Number,
    default: 0, 
  },
});

const parentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: subTaskSchema,
    },
  ],
});

mongoose.models = {}

export const user = mongoose.model('user', parentSchema);

