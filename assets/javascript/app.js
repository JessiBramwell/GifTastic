//  Array of buttons
var timePeriod = ["1920s", "1930s", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s"];
var genre = ["cartoon", "film", "horror", "comedy", "classic", "scifi", "sitcoms"]
//  display function
function displayGif() {
  const APIkey = "H9MSCG68kgGO7ELf2uBmYjm9vhdMPa1h"
  var btnValue = $(this).attr("data-genre");
  var optValue = $("#time-period-select").val()
  var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${optValue}-${btnValue}&limit=25&offset=0&rating=G&lang=en`
  //  ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#gif-view").empty();
    var result = response.data;
    // display gifs
    for (let i = 0; i < 12; i++) {

      var stillURL = result[i].images.fixed_height_small_still.url
      var animateURL = result[i].images.fixed_height_small.url

      var gif = $("<img class='gif'>").attr("src", stillURL).attr("data-still", stillURL).attr("data-animate", animateURL).attr("data-state", "still");
      var rating = result[i].rating;

      gif.appendTo($("#gif-view"));
    }
  });
};

// render buttons
function renderBtns() {
  // loop through array
  $("#btn-view").empty();

  for (let i = 0; i < genre.length; i++) {
    var btn = $("<button>");
    btn.addClass("gif-btn").attr("data-genre", genre[i]).text(genre[i]).appendTo("#btn-view")
  }
}

// render dropdown 
function renderOptions() {
  for (let i = 0; i < timePeriod.length; i++) {
    var option = $("<option>");
    option.attr("data-time-period", timePeriod[i]).text(timePeriod[i]).appendTo("#time-period-select")

  }
}

$(document).on("click", ".gif-btn", displayGif);
$(document).on("click", ".gif", animate);

function animate() {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

$("#add-gif").on("click", function (e) {
  e.preventDefault();

  var newGif = $("#gif-input").val().trim();
  genre.push(newGif);
  renderBtns();
  $("#gif-input").val(" ");
});


renderBtns();
renderOptions();
