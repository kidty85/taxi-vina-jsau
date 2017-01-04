(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function(){
//var bindEventsIndex = function(){
  $("#btnLogin").click(function(){
    var dataToSend      = {}
    dataToSend.function = "login"
    dataToSend.email    = $("#mailConnexion").val()
    dataToSend.password = $("#mdpConnexion").val()
    var servlet
    if($("#genreClient").is(':checked'))
      servlet = "api/clients"
    else if($("#genreDriver").is(':checked'))
      servlet = "api/drivers"
    stringToSend	= JSON.stringify(dataToSend)
    console.log(stringToSend)
    $.ajax({
      type: "POST",
      url: servlet,
      data: stringToSend,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        console.log("Succes: " + data);
        if(data.flag==1)
          if($("#genreClient").is(':checked')){
            App.client=data.client
            window.location.href = "/booking";
          }else if($("#genreDriver").is(':checked')){
            App.driver=data.driver
            window.location.href = "/booking";
          }
        else
          console.log('ko');
      }
    })
  })

  $("#btnSignup").click(function(){
    if($("#genreClient").is(':checked'))
      window.location.href = "/client"
    else if($("#genreDriver").is(':checked'))
      window.location.href = "/driver"
  })
//}
})

},{}]},{},[1]);
