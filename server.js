require("dotenv").config();
const PORT = process.env.PORT || 4100;
const io = require("socket.io")(PORT, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

io.on("connection", (socket) => {
    console.log("A user connected!");

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
    });

    socket.on("changeSlideHost", ({ nextSlide }) => {
        io.emit("changeSlideViewer", nextSlide);
    });

    socket.on("choiceSubmitViewer", (newSlide) => {
        io.emit("choiceSubmitHost", newSlide);
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected!");
    });
});
