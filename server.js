require("dotenv").config();
const PORT = process.env.PORT || 4100;
const io = require("socket.io")(PORT, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("A user connected!");

    socket.on("disconnect", () => {
        console.log("A user disconnected!");
    });
});
