import express from 'express';

const app = express();

//mddleware
app.use(express.json());

//routes and listeners
app.listen(6969, () =>console.log("Server Terbuka") );