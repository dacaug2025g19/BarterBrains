namespace ChatApplication
{
    public static class MessageStore
    {
        public static Dictionary<string, List<ChatMessage>> Rooms = new();
        public static Dictionary<string, int> RoomUsers = new();
        public static Dictionary<string, string> ConnectionRoomMap = new();

    }

}
