//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

var socket = io.connect();

var userName;

var target = "all";

socket.on('connect', function() {
    console.log("Connected");
    userName = prompt("Please enter a username");
    num = socket.id;
    socket.emit('idUser', userName, num);
    socket.emit('timer');
});

// Receive from any event
socket.on('chatmessage', function (data, message, senderName, id, target) {
    
    var link = "http://www.indianfunpic.com/wp-content/uploads/2016/06/Funny-Kids-14.jpg";   
    var funnypic1 = "<img src=" + link + ">";
    console.log("message= " + message)
    // if(message ==" win"){
    if(message.includes(" win")){
    console.log("yayyyy");
    document.getElementById('messages').innerHTML = "" + funnypic1 + "" + document.getElementById('messages').innerHTML;
    }
    else{

    
    if (id == socket.id){
        var newLine = document.createElement('p');
        var userText = document.createAttribute('class');
        userText.value= "user";
        var newMessage = document.createTextNode(data);
        newLine.appendChild(newMessage); 
        newLine.setAttributeNode(userText);
        var chatArea = document.getElementById('messages');
        chatArea.appendChild(newLine);
    }
    
    else if (target == userName) {
        var newLine = document.createElement('p');
        var userText = document.createAttribute('class');
        userText.value= "private";
        var newMessage = document.createTextNode(data);
        newLine.appendChild(newMessage); 
        newLine.setAttributeNode(userText);
        var chatArea = document.getElementById('messages');
        chatArea.appendChild(newLine);
    }
    
    else if (target == "all") {
        var newLine = document.createElement('p');
        var userText = document.createAttribute('class');
        userText.value= "chatPartner";
        var newMessage = document.createTextNode(data);
        newLine.appendChild(newMessage); 
        newLine.setAttributeNode(userText);
        var chatArea = document.getElementById('messages');
        chatArea.appendChild(newLine);
    }
    
    else{
        console.log("nothing");
    }
    }
    
    if (target == userName && message == "end"){
        socket.emit('close');
    }
    console.log("Sender ID: " + id);
});

socket.on('closeWindow', function(){
    var doc = document.getElementsByTagName("BODY")[0].innerHTML="Your time in the game has ended";
    socket.emit('boot');
});

var sendmessage = function(message) {
    console.log("chatmessage: " + userName + " " + message);
    var data = userName + ": " + message
    socket.emit('chatmessage',  data, message, userName, socket.id, target);
    var formField = document.getElementById('message');
    formField.value = ' ';
};

var setTarget = function(bullseye){
  target = bullseye;
};