// Creating a starting array.
var anime = ["One Piece Anime", "Naruto", "Gundam", "One Punch Man", "Sailor Moon", "My Hero Academia", "Pokemon", "Cowboy Bebop", "Trigun", "Hamtaro"];

function renderButtons() {
    // Deleting buttons so they are not repeated
    $("#animeButtons").empty();

    // Anime buttons loop
    for (var i = 0; i < anime.length; i++) {
        // Adding buttons to the array
        var button = $("<button>");
        // Button class addon
        button.addClass("animeButton");
        // Adding data-attribute
        button.attr("data-anime", anime[i]);
        // Making the button a text
        button.text(anime[i]);
        // Appending the button
        $("#animeButtons").append(button);
    };
}
// On click event for adding the buttons
$("#addAnime").on("click", function(event) {
    event.preventDefault();

    var animeAdded = $("#anime-input").val().trim();
    // Pushing the inputed anime to the array
    anime.push(animeAdded);
    // Calling the renderButtons function again
    renderButtons();
});

// Calling the Button function
renderButtons();

// Add click event listen listener to all buttons
$("button").on("click", function () {
    // Grabbing and storing the data-animal property value from the button
    var anime = $(this).attr("data-anime");

    // Construct a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search";

    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                q: anime,
                api_key: "zifiA26FIFM4BFaQUWJqH6B7mKe3wGKW",
                limit: 10
            }
        })
        // After data comes back from the request
        .done(function (response) {
            // Store the data from the AJAX request in the results variable
            var results = response.data;

            // Clear the previous button's divs
            $("#animeResult").empty();

            // Loop through each result item
            // We set created a variable len and set it equal to results.length 
            // so that the loop doesn't have to calculate the length of the array each time
            // This is more efficient
            for (var i = 0, len = results.length; i < len; i++) {
                // Create and store a div tag with a class on it
                var animeDiv = $("<div class='giph'><div>");

                // Create a paragraph tag with the result item's rating
                var pRating = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animeImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                animeImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv
                animeDiv.append(pRating);
                animeDiv.append(animeImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#animeResult").append(animeDiv);
            }
        });
});
