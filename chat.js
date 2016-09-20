//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

var socket = io.connect();

//var ChatName = {};
//
//function User(userPrompt){
//    this.userName = userPrompt;
//}

var userName;
var target = "all";

socket.on('connect', function() {
    console.log("Connected");
    userName = prompt("Please enter a username");
});

// Receive from any event
socket.on('chatmessage', function (data, message, senderName, id, target1) {
    
    if (userName == target1){
        if(message.indexOf("end") >= 0){
            socket.emit('close');
        }
        else{
            var newLine = document.createElement('p');
            var userText = document.createAttribute('class');
            userText.value= "private";
            var newMessage = document.createTextNode(data);
            newLine.appendChild(newMessage); 
            newLine.setAttributeNode(userText);
            var chatArea = document.getElementById('messages');
            chatArea.appendChild(newLine);
        }
    }
     
    else if (id == socket.id){
        var newLine = document.createElement('p');
        var userText = document.createAttribute('class');
        userText.value= "user";
        var newMessage = document.createTextNode(data);
        newLine.appendChild(newMessage); 
        newLine.setAttributeNode(userText);
        var chatArea = document.getElementById('messages');
        chatArea.appendChild(newLine);
    }

    else if (message.indexOf("funny") >= 0) {
        var newLine = document.createElement('p');
        var userText = document.createAttribute('class');
        userText.value= "userjoke";
        var newMessage = document.createTextNode(data);
        newLine.appendChild(newMessage); 
        newLine.setAttributeNode(userText);
        var chatArea = document.getElementById('messages');
        chatArea.appendChild(newLine);
    }
    
    else{
        var newLine = document.createElement('p');
        var userText = document.createAttribute('class');
        userText.value= "chatPartner";
        var newMessage = document.createTextNode(data);
        newLine.appendChild(newMessage); 
        newLine.setAttributeNode(userText);
        var chatArea = document.getElementById('messages');
        chatArea.appendChild(newLine);
    }
    
    console.log("Sender ID: " + id);
});

socket.on('closeWindow', function(){
    var doc = document.getElementsByTagName("BODY")[0].innerHTML="Your time in the game has ended";
    socket.emit('boot');
});

var sendmessage = function(message) {
    var data = userName + ": " + message
    socket.emit('chatmessage',  data, message, userName, socket.id, target);
    var formField = document.getElementById('message');
    formField.value = ' ';
};

var setTarget = function(bullseye){
  target = bullseye;
};