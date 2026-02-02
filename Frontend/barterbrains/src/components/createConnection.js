import * as signalR from "@microsoft/signalr";

const createConnection = () => {
  return new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7268/chatHub")
    .withAutomaticReconnect()
    .build();
};

export default createConnection;
