const socket = io()
let userName;
do {
    userName=prompt("Enter your Name")
} while (!userName);

document.getElementById("sendMessageButton").addEventListener("click",()=>{
    if (document.getElementById("sendMessageTextArea").value=="") {
        return
    }
    let msg={
        userName,
        message:document.getElementById("sendMessageTextArea").value
    };
    appendMessage(msg,"outgoing")
    socket.emit("message",msg)
    document.getElementById("sendMessageTextArea").value=""
})


function appendMessage(msg,type) {
    document.querySelector(".chatArea").insertAdjacentHTML("beforeend",`
    <div class="message ${type}">
        <div class="senderReceiver">${msg.userName}</div>
        <div class="mainMessage">${msg.message.replace(/\n/g,"<br>")}</div>
    </div>
    `)
}

socket.on("message",(msg)=>{
    appendMessage(msg,"incoming")
})