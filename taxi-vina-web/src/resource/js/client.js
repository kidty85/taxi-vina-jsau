$(document).ready(function(){
//function bindEventsClient(){
  $("#btnSignup").click(function(){
    if($("#mdpInscription").val()==$("#mdpConfirmInscription").val()){
      var dataToSend    = {}
      dataToSend.function   = "signup";
      dataToSend.Lastname   = $("#nomInscription").val()
      dataToSend.Firstname  = $("#prenomInscription").val()
      dataToSend.email      = $("#mailInscription").val()
      dataToSend.password   = $("#mdpInscription").val()
      console.log(dataToSend)
      stringToSend	= JSON.stringify(dataToSend)
      console.log(stringToSend)
      $.ajax({
          type: "POST",
          url: "api/clients",
          data: stringToSend,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data){
            console.log("Succes: " + data);
            if(data.flag==1)
              console.log('ok');
            else
              console.log('ko');
            }
      })
    }
  })
//}
})
