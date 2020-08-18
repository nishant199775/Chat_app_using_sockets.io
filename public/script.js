let socket=io()
let login1=false
var audio=new Audio('ping.mp3');
$('#inp').show()
$('#chatbox').hide()
$('#ulmsg').hide()
$('#signupbox').hide()

$('#start').click(function(){
    if($('#pwd').val()=="")
    {
        window.alert("Enter some password")
    }
    else{
    socket.emit("login",{unm:$('#inpbox').val(),
        pwd:$('#pwd').val()
    })
        }
})

//---------------------------------->
$('#signbtn').click(function(){
    $('#inp').hide()
    $('#signupbox').show()
})
//--------------------------------->
$('#login').click(function(){
    $('#inp').show()
    $('#signupbox').hide()
})
//------------------------------->
$('#send').click(function(){
    $('#ulmsg').show()
    $('#msgbox').focus()
    socket.emit("msg_send",{to:$('#sendto').val(),
    msg:$('#msgbox').val()})
    $('#ulmsg').append($('<li class="list-group-item text-right">').text("[Me]: "+"  "+$('#msgbox').val()))
    $('#msgbox').val('')
})
socket.on('logged_in',function(){
    login1=true
    $('#inp').hide()
    $('#signupbox').hide()
    $('#chatbox').show()
    
})
socket.on('login_failed',function(){ 

    window.alert("username or password is not correct")
})
socket.on('signup_failed',function(){ 

    window.alert("username already exist")
})

socket.on('signup',()=>
{
    window.alert("Not Regstered SignUp first")
    $('#inp').hide()
    $('#signupbox').show()

})


$('#signupbtn').click(function(){
    if($('#newPwd').val()=="")
    {
        window.alert("Enter some password")
    }
    else{
    socket.emit("signedup",{unm:$('#newUnm').val(),
        pwd:$('#newPwd').val()
    })
        }
})


socket.on('msg_received',function(data)
{     $('#ulmsg').show()
   audio.play()
    if(login1)
    $('#ulmsg').append($('<li class="list-group-item text-left">').text("["+data.from+"]: "+"  "+data.msg))
})
