// Initial array of gifs
var topics = ["Animals", "Video Games", "Tea", "Electronics", "Plants", "Art", "Anime"];
$(document).ready(function() {

    // Adds buttons.
     function renderButtons() {

        $('.buttons').empty();
        for (var i = 0; i < topics.length; i++ ) {
            
            // Adds new buttons for each item in array.
            var button = $('<button>');
            // Adds class to button.
            button.addClass('btn btn-secondary my-2 my-sm-0');
            // Adds a data attribute.
            button.data('name', topics[i]);
            // Adds the text to the buttons.
            button.text(topics[i]);
            // Adds a button to the button area.
            $('.buttons').append(button);
        }
        console.log(renderButtons);
    }

    // Displays gifs on page.
    function displayGifs() {

        var name = $(this).data("name");
        console.log('Here are the gifs for ' + name);

        // Link to API.
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + name + '&api_key=RcsY3z3u9rM2wVu92IGscG0ozY3GDZJl&limit=10';

        // AJAX call.
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log('Retrieving gifs for' + name);

            var data = response.data;
            $('#gifs').empty();

            var row = $("<div class='row'>");

            for (var i = 0; i < data.length; i++) {

                if (data[i].rating !== 'r' && data[i].rating !== 'pg-13') {
                    var giphy = data[i].images.fixed_height.url;
                    var still = data[i].images.fixed_height_still.url;

                    var giphyImg = $("<img class= 'giphy'>");
                    giphyImg.data('still', still);
                    giphyImg.data('animate', giphy);
                    giphyImg.data('state', 'animate');
                    giphyImg.attr('src', giphy);
                    var imgBox = $("<div class= 'imgBox col-lg-10'>");
                    imgBox.append(giphyImg);
                    if (i % 2 == 0) {
                        row = $("<div class= 'row'>");
                    }
                    row.append(imgBox);
                    $('#gifs').append(row);
                }

            }
            
            $('html, body').animate({
                scrollTop: $("#gifs").offset().top
            }, 1000);

            console.log(response);

        });
    }

    $('.submit').click(function(event) {
        event.preventDefault();
        var name = $('#topics')
        .val()
        .trim();

        if (name != "") {
            console.log('A new button will be added' + name);
            topics.push(name);
            $('#topics').val('');
            renderButtons();
        }
    });

// This function changes the gifs from still to animate and vice-versa.
function changeState() {
    console.log('Changing state.')
    var state = $(this).data('state');
    if (state == 'animate') {
        $(this).attr('src', $(this).data('still'));
        $(this).data('state', 'still');
    } else {
        $(this).attr('src', $(this).data('animate'));
        $(this).data('state', 'animate');
    }
}

// Adds a click event.
$(document).on('click', '.buttons', displayGifs);
$(document).on('click', '.submit', displayGifs);
$(document).on('click', ".giphy", changeState);

// Calls the renderButtons function to display initial buttons.
renderButtons();
});
