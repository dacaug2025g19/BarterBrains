using Microsoft.AspNetCore.SignalR;
namespace ChatApplication.Hubs

{
    public class ChatHub : Hub
    {
        // Create room and join both users
        public async Task JoinRoom(string roomId)
        {
            Console.WriteLine("JOINING ROOM: " + roomId);

            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

            // Map connection to room
            MessageStore.ConnectionRoomMap[Context.ConnectionId] = roomId;

            // ✅ CREATE KEY FIRST IF NOT EXISTS
            if (!MessageStore.RoomUsers.ContainsKey(roomId))
                MessageStore.RoomUsers[roomId] = 0;

            MessageStore.RoomUsers[roomId]++;

            Console.WriteLine("Users in room: " + MessageStore.RoomUsers[roomId]);

            // Send old messages if exist
            if (MessageStore.Rooms.ContainsKey(roomId))
            {
                Console.WriteLine("OLD MSG COUNT: " + MessageStore.Rooms[roomId].Count);

                await Clients.Caller.SendAsync(
                    "LoadOldMessages",
                    MessageStore.Rooms[roomId]
                );
            }
            else
            {
                Console.WriteLine("NO OLD MESSAGES");
            }
        }



        // Send message to room
        public async Task SendMessage(string roomId, int senderId, string message)
        {
            var msg = new ChatMessage
            {
                SenderId = senderId,
                Message = message,
                Time = DateTime.Now
            };
            Console.WriteLine($"ROOMS COUNT: {MessageStore.Rooms.Count}");
            // Store in memory
            if (!MessageStore.Rooms.ContainsKey(roomId))
                MessageStore.Rooms[roomId] = new List<ChatMessage>();

            MessageStore.Rooms[roomId].Add(msg);
            Console.WriteLine($"Messages in {roomId}: {MessageStore.Rooms[roomId].Count}");
            // Send live
            await Clients.Group(roomId)
                .SendAsync("ReceiveMessage", senderId, message, msg.Time);
        }

        public async Task Typing(string roomId, int userId)
        {
            await Clients.Group(roomId)
                .SendAsync("UserTyping", userId);
        }


        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (MessageStore.ConnectionRoomMap.TryGetValue(Context.ConnectionId, out var roomId))
            {
                MessageStore.RoomUsers[roomId]--;

                if (MessageStore.RoomUsers[roomId] <= 0)
                {
                    MessageStore.RoomUsers.Remove(roomId);
                    MessageStore.Rooms.Remove(roomId);
                }

                MessageStore.ConnectionRoomMap.Remove(Context.ConnectionId);
            }

            await base.OnDisconnectedAsync(exception);
        }


    }
}
