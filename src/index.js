require("dotenv").config();
const cors = require('cors');
const express = require("express");

const connectDB = require("./config/db");

const userRouter = require('./routes/user.routes');
const viniloRouter = require('./routes/vinilo.routes');
const cartRouter = require('./routes/cart.routes');

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

const whitelist = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',     // Vite
  'http://127.0.0.1:5173',
  'http://localhost:4200',     // Angular
  'https://proyecto-7-frontend-x-4hfm.onrender.com/',   // Frontend en Render
  'https://proyecto-7-backend-izjo.onrender.com/' // Backend en Render 
];


const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin Origin (Postman/cURLs) y los que están en whitelist
    if (!origin || whitelist.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};


// middleware
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'ok'});
});

app.use('/api/user', userRouter);
app.use('/api/product', viniloRouter);
app.use('/carts', cartRouter);

app.listen(PORT, ()=> {
    console.log('Servidor corriendo en el puerto ' + PORT);
})
