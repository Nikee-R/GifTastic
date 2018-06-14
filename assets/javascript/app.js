// Initial array of gifs
var animals = ["Otters", "Kitties", "Bunnies"];

    // Displays gifs on page.
    function displayGifs() {

        var gif = $(this).attr("#gif");
        console.log('Here are the gifs for ' + gif);

        // Link to API.
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=RcsY3z3u9rM2wVu92IGscG0ozY3GDZJl';

        // AJAX call.
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log('Retrieving gifs for' + gif);

            // Creating a div to hold the gifs.
            var data = response.data;
            $('#gifs').empty();

            var row = $("<div class='row'>");

            for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {

                if (dataIndex[i].rating !== 'r' && dataIndex[i].rating !== 'pg-13') {
                    var giphy = dataIndex[i].images.fixed_height.url;
                    var still = dataIndex[i].images.fixed_height_still.url;

                    var giphyImg = $("<img class= 'giphy'>");
                    giphyImg.data('still', still);
                    giphyImg.data('animate', giphy);
                    giphyImg.data('state', 'animate');
                    giphyImg.attr('src', giphy);
                    var imgBox = $("<div class= 'imgBox col-sm-2'>");
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

        // Adds buttons.
        function renderButtons() {
            console.log('Rendering buttons.');
    
            $('#buttons').empty();
            for (var animalsIndex = 0; animalsIndex < animals.length; animalsIndex++ ) {
                
                // Adds new buttons for each item in array.
                var button = $('<button>');
                button.addClass('gif');
                button.data('name', animals[animalsIndex]);
    
                // Adds a button to the button area.
                $('#buttons').append(button);
            }
            
            console.log('Rendering buttons.')
        }

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

