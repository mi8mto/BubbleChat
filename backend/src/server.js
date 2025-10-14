import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

const wss = new WebSocketServer({ port: 8080 });

console.log("✅ BubbleChat WebSocket server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  ws.id = uuidv4();
  console.log("New client connected:", ws.id);

  ws.on("message", (raw) => {
    const data = JSON.parse(raw.toString());
    if (data.type === "message") {
      const msg = {
        type: "message",
        id: Date.now() + "-" + Math.floor(Math.random() * 1000),
        sender: data.sender,
        text: data.text,
        timestamp: new Date().toISOString(),
        clientId: ws.id,
      };

      // Рассылаем всем кроме отправителя
      for (const client of wss.clients) {
        if (client.readyState === client.OPEN && client.id !== ws.id) {
          client.send(JSON.stringify(msg));
        }
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected:", ws.id);
  });
});
