$(document).ready(function(){
	console.log("ready");
	$('#submit_button').click(function(event){
		event.preventDefault();
		alert($('#title').val());
	});
});