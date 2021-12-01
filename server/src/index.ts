import { Server } from "socket.io";
import http from "http";

const io = new Server();
const server = http.createServer();

const PORT = 8081

const players = {};

io.attach(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
  
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("update", (payload) => {
        // console.log("received update");
        // console.log(payload);
        // TODO filter nonsense
        // @ts-ignore
        players[socket.id] = payload;

        socket.emit("update", players);
    });

    socket.on("disconnect", (reason) => {
        // @ts-ignore
        delete players[socket.id];
      });
});



