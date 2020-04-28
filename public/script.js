let socket=io()
let login1=false
$('#inp').show()
$('#chatbox').hide()

$('#start').click(function(){
    
    socket.emit("login",{unm:$('#inpbox').val(),
        pwd:$('#pwd').val()
})
})
$('#send').click(function(){
    socket.emit("msg_send",{to:$('#sendto').val(),
    msg:$('#msgbox').val()})
    $('#ulmsg').append($('<li class="list-group-item">').text("[Me]: "+"  "+$('#msgbox').val()))
    $('#msgbox').val('')
})
socket.on('logged_in',function(){
    login1=true
    $('#inp').hide()
    $('#chatbox').show()
})
socket.on('login_failed',function(){ 

    window.alert("username or password is not correct")
})


socket.on('msg_received',function(data)
{     
    if(login1)
    $('#ulmsg').append($('<li class="list-group-item">').text("["+data.from+"]: "+"  "+data.msg))
})
