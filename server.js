import express, { request, response } from 'express';
import mongoose from 'mongoose';
import Cards from './Models/CardsDBSchema.js';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import connectUrl from './dbURL.js'; 

// app config
const app = express();
const PORT = process.env.PORT || 8001;
const connectionUrl = connectUrl;

// middlewares
app.use(bodyParser.urlencoded(true));
app.use(express.json())
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });
// const corOptions: cors.c = {
//     origin: 'http://localhost:3000'
// }
app.use(cors())

// db config
mongoose.connect(connectionUrl, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:true
});

// Api endpoints
app.get('/', (request,response) => {
    response.status(200)
    response.send("Hello world")
});

app.post('/tinder/card', (request,response) => {
    const dbCard = request.body;

    Cards.create(dbCard, (err,data) => {
        if(err){
            response.status(500);
            response.send(err);
        }
        else{
            response.status(201)
            response.send(data);
        }
    });
});

app.get('/tinder/card', (request,response) => {

    Cards.find((err,data) => {
        if(err){
            response.status(500);
            response.send(err);
        }
        else{
            response.status(201)
            response.send(data);
        }
    });
});

app.delete('/tinder/card/delete/:id',(request,response) => {
    var id = request.params.id; 
    Cards.findByIdAndRemove(id, (err) => {
        if(err){
            console.log(err)
            response.send("Not Deleted");
        }
        else{
            response.send("Deleted Successfully");
        }
    });
});

// Listener
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
