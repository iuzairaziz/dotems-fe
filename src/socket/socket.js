class Socket {
  constructor(socket) {
    this.socket = socket;
  }

  newMessage = (msg) => {
    this.socket.emit("new-comment", (msg) => {
      console.log("from socket", msg);
    });
  };
}
