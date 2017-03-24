

var model = {
  watchlistItems: [],
  browseItems: [api]
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "c4b9ee7818601f624fb0f2e86036dce2" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			callback(response);
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render(ajaxresults) {
	ajaxresults.results.forEach(function(movie) {
		var title = movie.title;
		var button = $("<button type=button>  Add to Watchlist </button><br><br>");
		button.click(function() {
  		model.watchlistItems.push(movie);
			var listMovie = $("<a></a>").text(title).attr("href", "www.themoviedb.org");
			$("#section-watchlist ul").append(listMovie, "<br>");
  		//render(ajaxresults);
				});
		var popularMovie = $("<a></a>").text(title).attr("href", "www.themoviedb.org");
		$("#section-browse ul").append(popularMovie, "   ", button);

  });

}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
