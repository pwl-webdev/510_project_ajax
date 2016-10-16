$(document).ready(function(){
	console.log("ready");
	$('#submit_button').click(function(event){
		event.preventDefault();
		//alert($('#title').val());
		//if ($('#title').val() != ""){
			omdbQuery(); 
		//}
	});
});

var omdbQuery = function(){
	console.log($('#title').val());
	//var queryString = "http://www.omdbapi.com/?t=amelia&y=&plot=short&r=json";
	$.ajax({
		url: "http://www.omdbapi.com/?",
		data: {
			s: $('#title').val(),
			page: ""
		},
		type: "GET",
		dataType: "json",

	}).done(function( json ) {
     $( "<h1>" ).text( json.Title ).appendTo( "#results" );
     //$( "<div class=\"content\">").html( json.html ).appendTo( "body" );
     $(`<h3>${json.Director}</h3>`).appendTo("#results");
        alert( "The request is complete!" );
	}).fail(function( xhr, status, errorThrown ) {
	   alert( "Sorry, there was a problem!" );
	   console.log( "Error: " + errorThrown );
	   console.log( "Status: " + status );
	   console.dir( xhr );
	});
};