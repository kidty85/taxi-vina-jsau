(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function(){
    $("#btnSend").click(function(){
      var dataToSend    = {}
      dataToSend.email  = $("#inpEmail").val()
      console.log(dataToSend)
      stringToSend	= JSON.stringify(dataToSend)
      console.log(stringToSend)
      $.ajax({
          type: "POST",
          url: "http://localhost:3001/api/clients",
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

},{}]},{},[1]);
