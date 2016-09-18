//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

var socket = io.connect();

socket.on('connect', function() {
    console.log("Connected");
    userName = prompt("Please enter a username");
});

var userName;
var userText

//var userID = function(user){
//    userName = user;
//};

// Receive from any event
socket.on('chatmessage', function (data, idNumber) {
    if (idNumber == socket.id){
        var newLine = document.createElement('p');
        userText = document.createAttribute('class');
        userText.value= "user";
        var newMessage = document.createTextNode(data);
        newLine.appendChild(newMessage); 
        console.log("this is newMessage : " + newMessage)

        var userInput =(document.getElementById('message').value)
        if (userInput== 'hello'){
            userText.value= "userblue";
        }
        if (userInput== 'funny'){
            userText.value= "userjoke";
        }

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


        var userInput =(document.getElementById('message').value)
        if (userInput== 'hello'){
            userText.value= "userblue";
        }

        if (userInput== 'funny'){
            userText.value= "userjoke";
        }
        newLine.setAttributeNode(userText);
        var chatArea = document.getElementById('messages');
        chatArea.appendChild(newLine);
    }
    console.log("Sender ID: " + idNumber);
});

socket.on('closeWindow', function(){
    window.open();
    window.close(); 
});

var sendmessage = function(message) {

    console.log("chatmessage: " + userName + " " + message);
    socket.emit('chatmessage',  userName + ": " + message, socket.id);
};