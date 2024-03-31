import mongoose from 'mongoose';

const TodoTaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description : {type: String, required: true},
    completed: { type: Boolean, default: false },
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
});

const TodoTask = mongoose.model('TodoTask', TodoTaskSchema);

export default TodoTask;
