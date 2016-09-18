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

Question: how do you analyze a string of text coming from the chat partner?  How do you convert that into string to be evaluated by the if statement?”