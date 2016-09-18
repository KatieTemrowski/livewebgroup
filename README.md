# websocket.lv

//added
function Chatters(id){
    this.id = id;
    
}

var chatter;
chatter = new Chatters(socket.id);

 <input type="text" id="user" name="userName">
 <input type="submit" value="enter" onclick="userID(document.getElementById('user').value);">

- create a list of all chat participants
- identify the chats coming from different people
- play with the room feature, to make chats available only to certain folks
- improve the way the chats display