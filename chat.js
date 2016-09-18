//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

var socket = io.connect();

var userName;

var target = 0;

socket.on('connect', function() {
    console.log("Connected");
    userName = prompt("Please enter a username");
    num = socket.id;
    socket.emit('idUser', userName, num);
});


//var userID = function(user){
//    userName = user;
//};

// Receive from any event
socket.on('chatmessage', function (data, idNumber, target) {
    if (idNumber == socket.id){
        var newLine = document.createElement('p');
        var userText = document.createAttribute('class');
        userText.value= "user";
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
    
    if (target == userName){
        socket.emit('close');
    }
    console.log("Sender ID: " + idNumber);
});

socket.on('closeWindow', function(){
    var doc = document.getElementsByTagName("BODY")[0].innerHTML="LOSER";
    socket.emit('boot');
//    window.open();
//    window.close(); 
});

var sendmessage = function(message) {
    console.log("chatmessage: " + userName + " " + message);
    socket.emit('chatmessage',  userName + ": " + message, message, userName, socket.id, target);
    
};

var setTarget = function(bullseye){
  target = bullseye;  
};