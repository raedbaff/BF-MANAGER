import express from "express";
import cors from "cors";
import BabyFootMatchrouter from "./routes/BabyFootMatchRoute";
import { connectToDatabase } from "./data/db";
import http from "http";
import { Server as SocketServer } from "socket.io";
import path from "path";
import dotenv from "dotenv"
dotenv.config()
const app = express();

const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", BabyFootMatchrouter(io));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
  });

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    socket.on("chatMessage",(data)=>{
      console.log(data);
      
      console.log(`message received ${JSON.stringify(data.message)}`);
      io.emit("chatMessage",data.message)
      
    })
});

connectToDatabase()
    .then(() => {
        console.log('Database connection established');

        server.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to database:', err);
    });
