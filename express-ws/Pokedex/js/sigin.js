window.onload = init; 

function init() {
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = "login.html";
        });

        document.querySelector('.btn-primary').addEventListener('click', sigin);
    } else {
        window.location.href = "pokedex.html";
    }
}

function sigin() {
    var mail = document.getElementById('input-mail').value;
    var name = document.getElementById('input-name').value; 
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name: name,
            user_mail: mail,
            user_password: pass
        }
    }).then(function(res){
        console.log(res);
        window.location.href = "login.html"; 
        alert("You've been registered")
    }).catch(function(err){
        console.log(err);
    })
}