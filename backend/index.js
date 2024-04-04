import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userRegisterSchema , userLoginSchema } from './validation/UserValidation.js';
import User from './model/User.js';
import tokenValidity from './middlewares/tokenValidity.js';
import TodoTask from './model/TodoTask.js';
import todoValidationSchema from './validation/TodoValidation.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());


mongoose.connect("mongodb+srv://manishbhurtel8848:bhurtelmanish123@manishbh123.b5kbs01.mongodb.net/mern_todo");



app.post('/register' , async (req , res) => {
    const {username , email , password} = req.body;
    // Zod validation
    const userData = {username , email , password}
    const validatedData = userRegisterSchema.safeParse(userData);

    if(validatedData.success) {
        try{
            const hashedPassword = await bcrypt.hash(password , 10);
            const user = await User.create({username , email , password: hashedPassword});
            if(user){
                return res.json({status: 200, msg: "User created successfully!! Please go and login!!"})  
            }
        } catch(err) {
            return res.json({status: 409, msg: "User with same email already exist!!! Please go and Login!!"})
        }
    } else{
        res.json({status : 411, msg: "User credentials are wrong!!! Enter valid credentials"})
    }

})



app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Zod validation
    const userData = { email, password };
    const validatedData = userLoginSchema.safeParse(userData);

    const existingUser = await User.findOne({ email: email });

    if (validatedData.success && existingUser) {
        try {
            const matchingPassword = await bcrypt.compare(password, existingUser.password);
            if (matchingPassword) {
                const userId = existingUser._id.toString(); 
                const token = jwt.sign({ userId: userId }, process.env.PASSWORD, { expiresIn: '4d' });
                return res.json({ status: 200, msg: "Email and password are correct", token: token , userId: userId });
            } else {
                return res.json({ status: 400, msg: "Email and password are incorrect" });
            }
        } catch (error) {
            return res.json({ status: 400, msg: "Password is incorrect" });
        }
    } else {
        return res.json({ status: 411, msg: "Cannot find user with such email!" });
    }
});



//Protected Landing page route
app.get('/pages/landingpage' , tokenValidity , (req , res) => {
    res.json({status: 200, msg:"Request access granted"});
})


//Protected Todos page route
app.get('/pages/todos', async (req, res) => {
    const token = req.headers.authorization;
    const tokenVerify = jwt.verify(token, process.env.PASSWORD);
    if (!token) {
        return res.json({ status: 400, msg: "Access denied. No Tokens provided." });
    }
    
    try {
        const tokenValidity = tokenVerify.exp <= Date.now() / 1000;
        const userId = tokenVerify.userId;
        const userTodos = await TodoTask.find({ user: userId });
        if(tokenVerify){
            return res.json({ status: 200, msg: "Page request granted.", allTodos: userTodos });
        }

    } catch (error) {
        return res.json({ status: 411, msg: 'Invalid token' });
    }
});



app.post('/pages/todos', async (req, res) => {
    const { title, description, completed, userId } = req.body;
    const token = req.headers.authorization;

    try {
        const tokenVerify = jwt.verify(token, process.env.PASSWORD);
        if (tokenVerify) {
            const todoData = {title: title, description: description, completed: completed, user: userId  };

            const validatedTodo = todoValidationSchema.safeParse(todoData);
            if (validatedTodo.success) {
                const todoUpload = await TodoTask.create(todoData);
                if (todoUpload) {
                    res.json({ status: 200, msg: "Todo added to database successfully" });
                }
            } else {
                res.json({ status: 500, msg: "Cannot put your todo in the database" });
            }
        }
    } catch (error) {
        console.log("Cannot post data" + error);
        res.json({ status: 500, msg: "Error posting todo data" });
    }
});


app.put('/pages/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const updateTodo = await TodoTask.findByIdAndUpdate(id, { title, description });
    console.log(updateTodo);
    if (updateTodo) {
      res.json({ status: 200, msg: "Todo updated successfully" });
    } else {
      res.json({ status: 500, msg: "Cannot update your todo" });
    }
});
  


app.delete('/pages/todos/:id', async (req, res) => {
    const { id } = req.params; // Extract id from URL params
    const todoDeleted = await TodoTask.deleteOne({ _id: id }); 
    if (todoDeleted) {
      res.json({ status: 200, msg: "Todo deleted successfully" });
    } else {
      res.json({ status: 400, msg: "Cannot delete the todo" });
    }
});


app.get('/' , (req, res) => {
    res.json({
        status: 200,
        msg: "Backend is working finee"
    })
})


const port = process.env.PORT || 8000;
app.listen(port);
