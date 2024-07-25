const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  console.log("GET request received");
  res.send("Running");
});

io.on("connection", (socket) => {
  console.log(`${socket.id} client connected`);
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name, callType }) => {
    console.log(
      `Calling user ${userToCall} from ${from} for a ${callType} call`
    );
    io.to(userToCall).emit("callUser", {
      signal: signalData,
      from,
      name,
      callType,
    });
  });

  socket.on("answerCall", (data) => {
    console.log(`Answering call to ${data.to}`);
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
