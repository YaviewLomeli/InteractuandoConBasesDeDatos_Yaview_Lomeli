$(function(){
  var l = new Login();
  l.verSession();
})


class Login {
  constructor() {
    this.submitEvent()
  }

  submitEvent(){
    $('form').submit((event)=>{
      event.preventDefault()
      this.sendForm()
    })
  }

  verSession(){
    $.ajax({
      url: '../server/verSes.php',
      type:'POST',
      data:{},
      dataType:'json',
      contentType:false,
      cache:false,
      processData: false,
      success: function(response){
        if(response.msg == 'OK'){
          window.location.href = 'main.html';
        }
      },
      error: function(){
        alert('error verify');
      }
    })
  }

  sendForm(){
    var form_data = new FormData();
    form_data.append('username', $('#user').val())
    form_data.append('password', $('#password').val())
    $.ajax({
      url: '../server/check_login.php',
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      data: form_data,
      type: 'POST',
      success: function(php_response){
        if (php_response.msg == "OK") {
          window.location.href = 'main.html';
        }else {
          alert(php_response.msg);
        }
      },
      error: function(){
        alert("El nombre de usuario es incorrecto.");
      }
    })
  }
}
