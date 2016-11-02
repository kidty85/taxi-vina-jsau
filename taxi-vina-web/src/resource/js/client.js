$(document).ready(function(){
    $("#btnSend").click(function(){
      var dataToSend    = {}
      dataToSend.email  = $("#inpEmail").val()
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
    })
})
