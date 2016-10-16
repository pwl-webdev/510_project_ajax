$(document).ready(function(){
	console.log("ready");
	$('#submit_button').click(function(event){
		event.preventDefault();
			$('#results').empty();
			omdbQuery(); 
	});
	$(document).scroll(function(e){
		if (element_in_scroll(`.result:nth-of-type(${page*10})`)) {
			page += 1;
			console.log("page "+page);
			omdbQuery();
		};
	});
});

var page = 1;

var omdbQuery = function(){
	//console.log($('#title').val());
	$.ajax({
		url: "http://www.omdbapi.com/?",
		data: {
			s: $('#title').val(),
			page: page
		},
		type: "GET",
		dataType: "json",
    beforeSend: function(){
        $(".loading").fadeIn();
    },
	}).done(function( json ) {
	    $(".loading").fadeOut();
    	appendResults(json);
	}).fail(function( xhr, status, errorThrown ) {
	   alert( "Sorry, there was a problem!" );
	   console.log( "Error: " + errorThrown );
	   console.log( "Status: " + status );
	   console.dir( xhr );
	});
};

var appendResults = function(json){
	console.log(json.Response);
	if(json.Response == "False"){
		$(`<h2>No results were found :(</h2>`).appendTo(`#results`);
	} else if (json.Response == "True"){
		for(var i = 0; i < json.Search.length; i++){
			$(`<div class="result" id="r_${i}"></div`).appendTo("#results");
			$(`<h3>${json.Search[i].Title}</h3>`).appendTo(`#r_${i}`);
			$(`<h4>${json.Search[i].Year}</h4>`).appendTo(`#r_${i}`);
			if(json.Search[i].Poster == "N/A"){
				$(`<img src="assets/images/na.jpeg">`).appendTo(`#r_${i}`);
			} else {
				$(`<img src="${json.Search[i].Poster}">`).appendTo(`#r_${i}`);
			}
		}
	}
}

var element_in_scroll = function(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}