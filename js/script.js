
/*
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = document.getElementById('street').value
    var $city = document.getElementById('city').value
/*    var cityParts = $cityVal.split(" ");
    var $city = "";
    for(var i=0; i < cityParts.length; i++)
    {
        $city = $city + "," + cityParts[i];
    }*/
  /*  
    var $streetPlusCity = $street + " " + $city;


    var requestString = "https://maps.googleapis.com/maps/api/streetview?size=300x300&location=" 
    + encodeURIComponent($streetPlusCity);
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    //http://api.nytimes.com/svc/books/v3/reviews[.response-format]?author={AUTHOR}&api-key={your-API-key}

    // load streetview

    // YOUR CODE GOES HERE!

    var nytimes_success = function(){

    };
    var nytimes_error = function(){

    };

    //var nytimes_sacks = "http://api.nytimes.com/svc/books/v3/reviews.jsonp?author=Oliver Sacks&api-key=c262b76484d68f7da3ef47ee5432d47f:7:71609997&callback=books";
    var nytimes_sacks = "http://api.nytimes.com/svc/books/v3/reviews.jsonp?author=Oliver Sacks"; 

    $.ajax({
            url: nytimes_sacks,
            dataType: "jsonp",
            type: "GET",
            data: { "api-key": "c262b76484d68f7da3ef47ee5432d47f:7:71609997"},
            jsonpCallback: "books",
            success: function(data){
                console.log(data);
            }
          });  


    $body.append('<img class="bgimg" src=' + requestString+ '>');

    return false;
};

$('#form-container').submit(loadData);

*/


function displayBkGndImage(){
    var $body = $('body');
    var $street = document.getElementById('street').value
    var $city = document.getElementById('city').value
    var $streetPlusCity = $street + " " + $city;
    var requestString = "https://maps.googleapis.com/maps/api/streetview?size=300x300&location=" + encodeURIComponent($streetPlusCity);
    $body.append('<img class="bgimg" src=' + requestString+ '>');
};

function loadData(){
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $greeting = $('#greeting');
    // clear out old data before new request
    $wikiElem.text("");
    // load streetview
    displayBkGndImage();
    loadNYTimesArticles();
    // YOUR CODE GOES HERE!
    return false;
};

var nytimes_success = function(data){
        var nytimes_articles_ul = $('#nytimes-articles');
        var numItems = data.num_results;
        var results = data.results;
        var book_list = document.getElementById('nytimes-articles');
        // append empty line to ul - begin.
        var listItem = document.createElement('listitem');
        var textString = "\n";
        listItem.innerText = textString;
        book_list.appendChild(listItem);
        // append empty line to ul - end

        for(var i=0; i < numItems; i++)
        {
            var listItem = document.createElement('listitem');
            var textString = "Review of " + results[i].book_title 
                                            + " by " 
                                            + results[i].byline 
                                            + "\n";
            listItem.innerText = textString;
            book_list.appendChild(listItem);
        }
};

var nytimes_error = function(){
        var nytimes_articles_ul = $('#nytimes-articles');
        var numItems = data.num_results;
        var results = data.results;
        var book_list = document.getElementById('nytimes-articles');
        // append empty line to ul - begin.
        var listItem = document.createElement('listitem');
        var textString = "\n";
        listItem.innerText = textString;
        book_list.appendChild(listItem);
        var listItem = document.createElement('listitem');
        var textString = "Error retrieving reviews from the New York Times" ;
        listItem.innerText = textString;
        book_list.appendChild(listItem);
};


function loadNYTimesArticles(){
    //var nytimes_sacks = "http://api.nytimes.com/svc/books/v3/reviews.jsonp?author=Oliver Sacks&api-key=c262b76484d68f7da3ef47ee5432d47f:7:71609997&callback=books";
    var nytimes_sacks = "http://api.nytimes.com/svc/books/v3/reviews.jsonp?author=Oliver Sacks"; 
    
    $.ajaxSetup({
      "error":function() { console.log("NY Times articles could not be loaded");  }
    });

    $.ajax({
            url: nytimes_sacks,
            dataType: "jsonp",
            type: "GET",
            data: { "api-key": "c262b76484d68f7da3ef47ee5432d47f:7:71609997"},
            jsonpCallback: "books",
            success: nytimes_success
        }).fail(function error(){
            console.log("NY Times articles could not be loaded");
        }).done(function doneNyTimes(){
            console.log("Done laoding articles");
        }); 

    return false;
};


function loadWikipediaArticles(){
    var wikipedia_sacks = "http://en.wikipedia.org/w/api.php"; 
    var urlData = new FormData();
    urlData.append("action","query");
    urlData.append("rvprop","content");
    urlData.append("titles","Oliver Sacks");
    urlData.append("format","json");
    urlData.append("limit","10");
    var urlStr = "http://en.wikipedia.org/w/api.php?"
                    + "action=query&"
                    + "titles=" + encodeURIComponent("Oliver Sacks") +"&"
                    + "format=json&"
                    + "callback=wikipediaAricles&"
                    + "continue=";

    $.ajax({
            url: urlStr,
            dataType: "jsonp",
            data:{
                format: 'json'
            },
            success: wikipedia_success
          }); 
    return false;
};


var wikipedia_success = function(data, status, jqXHR){
    console.log(data);
};



$('#form-container').submit(loadData);
$('#my-form').submit(loadData);
$('#wikipedia-submit-btn').click(loadWikipediaArticles);
