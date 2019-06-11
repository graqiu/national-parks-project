var parkResultsTable;
const baseUrl = "https://developer.nps.gov/api/v1";
const apiKey = "lNxAC0KLnJOkpKWzcdCYv8sDkeSc4eHhLBy6NUMl";

// Disable search button until state has been selected
$('#stateCode').one('change', function() {
     $('#searchParksBtn').prop('disabled', false);
});

// Show spinner while waiting for results
$(document).on({
    ajaxStart: function() { $("body").addClass("loading"); },
    ajaxStop: function() { $("body").removeClass("loading"); }    
});

function getVisitorCenters(parkCode) {
    clearMoreInfo();

    const settings = {
        "url": baseUrl + "/visitorcenters?api_key=" + apiKey + "&parkCode=" + parkCode,
        "type": "GET"
    }
    $.ajax(settings).done(function (response) {
        scrollToMoreInfo();
        $("#moreInfoTitle").html("Visitor Centers");
        
        if (response.data == null || response.data.length < 1)
            $("#moreInfoContent").html("Sorry, no visitor center information for this park is available at the moment.");
        else {
            const visitorCenters = response.data;
            for (var i = 0; i < visitorCenters.length; i++) {
                $("#moreInfoContent").append('<strong>' + visitorCenters[i].name + '</strong>');
                $("#moreInfoContent").append('<br>')
                $("#moreInfoContent").append(visitorCenters[i].description);
                $("#moreInfoContent").append('<br>')
                $("#moreInfoContent").append('<a href="' + visitorCenters[i].url + 
                    '" target="_blank">' + visitorCenters[i].url +'</a>');
                $("#moreInfoContent").append('<br><br>')
            }
        }
    })
}

function getCampgrounds(parkCode) {
    clearMoreInfo();

    const settings = {
        "url": baseUrl + "/campgrounds?api_key=" + apiKey + "&parkCode=" + parkCode,
        "type": "GET"
    }
    $.ajax(settings).done(function (response) {
        scrollToMoreInfo();
        $("#moreInfoTitle").html("Campgrounds");
        
        if (response.data == null || response.data.length < 1)
            $("#moreInfoContent").html("Sorry, no campground information for this park is available at the moment.");
        else {
            const campgrounds = response.data;
            for (var i = 0; i < campgrounds.length; i++) {
                $("#moreInfoContent").append('<strong>' + campgrounds[i].name + '</strong>');
                $("#moreInfoContent").append('<br>')
                $("#moreInfoContent").append(campgrounds[i].description);
                $("#moreInfoContent").append('<br>')
                if (campgrounds[i].directionsoverview != null && campgrounds[i].directionsoverview.length > 0) {
                    $("#moreInfoContent").append(campgrounds[i].directionsoverview);
                    $("#moreInfoContent").append('<br>')
                }
                if (campgrounds[i].regulationsoverview != null && campgrounds[i].regulationsoverview > 0) {
                    $("#moreInfoContent").append(campgrounds[i].regulationsoverview);
                    $("#moreInfoContent").append('<br>')
                }
                $("#moreInfoContent").append('<br>')
            }
        }
    })
}

function getAlerts(parkCode) {
    clearMoreInfo();

    const settings = {
        "url": baseUrl + "/alerts?api_key=" + apiKey + "&parkCode=" + parkCode,
        "type": "GET"
    }
    $.ajax(settings).done(function (response) {
        scrollToMoreInfo();
        $("#moreInfoTitle").html("Alerts");
        
        if (response.data == null || response.data.length < 1)
            $("#moreInfoContent").html("There are no alerts for this park currently.");
        else {
            const alerts = response.data;
            for (var i = 0; i < alerts.length; i++) {
                $("#moreInfoContent").append('<strong>' + alerts[i].title + '</strong>');
                $("#moreInfoContent").append('<br>')
                $("#moreInfoContent").append(alerts[i].description);
                $("#moreInfoContent").append('<br><br>')
            }
        }
    })
}

function getNews(parkCode) {
    clearMoreInfo();

    const settings = {
        "url": baseUrl + "/newsreleases?api_key=" + apiKey + "&parkCode=" + parkCode,
        "type": "GET"
    }
    $.ajax(settings).done(function (response) {
        scrollToMoreInfo();
        $("#moreInfoTitle").html("News Releases");
        
        if (response.data == null || response.data.length < 1)
            $("#moreInfoContent").html("There are no news releases for this park currently.");
        else {
            const news = response.data;
            for (var i = 0; i < news.length; i++) {
                $("#moreInfoContent").append('<strong>' + news[i].title + '</strong>');
                $("#moreInfoContent").append('<br>')
                $("#moreInfoContent").append('<a href="' + news[i].url + 
                    '" target="_blank">' + news[i].url +'</a>');
                $("#moreInfoContent").append('<br><br>')
            }
        }
    })
}

function getArticles(parkCode) {
    clearMoreInfo();
    
    const settings = {
        "url": baseUrl + "/articles?api_key=" + apiKey + "&parkCode=" + parkCode,
        "type": "GET"
    }
    $.ajax(settings).done(function (response) {
        scrollToMoreInfo();
        $("#moreInfoTitle").html("Articles");
        
        if (response.data == null || response.data.length < 1)
            $("#moreInfoContent").html("There are no articles for this park currently.");
        else {
            const articles = response.data;
            for (var i = 0; i < articles.length; i++) {
                $("#moreInfoContent").append('<strong>' + articles[i].title + '</strong>');
                $("#moreInfoContent").append('<br>')
                $("#moreInfoContent").append('<a href="' + articles[i].url + 
                    '" target="_blank">' + articles[i].url +'</a>');
                $("#moreInfoContent").append('<br><br>')
            }
        }
    })
}

function getEvents(parkCode) {
    clearMoreInfo();

    const settings = {
        "url": baseUrl + "/events?api_key=" + apiKey + "&parkCode=" + parkCode,
        "type": "GET"
    }
    $.ajax(settings).done(function (response) {
        scrollToMoreInfo();
        $("#moreInfoTitle").html("Events");
        
        if (response.data == null || response.data.length < 1)
            $("#moreInfoContent").html("There are no events for this park currently.");
        else {
            const events = response.data;
            for (var i = 0; i < events.length; i++) {
                $("#moreInfoContent").append('<strong>' + events[i].title + '</strong>');
                $("#moreInfoContent").append('<br>')
                $("#moreInfoContent").append("Next date: " + events[i].datestart);
                $("#moreInfoContent").append(events[i].description);
                if (events[i].contacttelephonenumber != null && events[i].contacttelephonenumber.length > 0) {
                    $("#moreInfoContent").append("Contact number: " + events[i].contacttelephonenumber);
                    $("#moreInfoContent").append('<br>')
                }
                if (events[i].contactemailaddress != null && events[i].contactemailaddress.length > 0) {
                    $("#moreInfoContent").append("Contact email: " + events[i].contactemailaddress);
                    $("#moreInfoContent").append('<br>')
                }
                $("#moreInfoContent").append('<br>')
            }
        }
    })
}

function getLessons(parkCode) {
    clearMoreInfo();

    const settings = {
        "url": baseUrl + "/lessonplans?api_key=" + apiKey + "&parkCode=" + parkCode,
        "type": "GET"
    }
    $.ajax(settings).done(function (response) {
        scrollToMoreInfo();
        $("#moreInfoTitle").html("Educational Resources");
        
        if (response.data == null || response.data.length < 1)
            $("#moreInfoContent").html("There are no educational resources for this park currently.");
        else {
            const resources = response.data;
            for (var i = 0; i < resources.length; i++) {
                $("#moreInfoContent").append('<strong>' + resources[i].title + '</strong>');
                $("#moreInfoContent").append('<br>')
                $("#moreInfoContent").append('<a href="' + resources[i].url + 
                    '" target="_blank">' + resources[i].url +'</a>');
                $("#moreInfoContent").append('<br><br>')
            }
        }
    })
}

function searchForParks(state, name, keyword) {
    clearMoreInfo();
    
    const settings = {
        "url": baseUrl + "/parks?api_key=" + apiKey + "&stateCode=" + state + "&q=" + keyword,
        "type": "GET"
    }
    
    $.ajax(settings).done(function (response) {
        const refinedName = name.trim(); // remove leading and trailing spaces
        var parkData;
        if (refinedName.length > 0) {
            parkData = [];
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].fullName.toUpperCase().includes(refinedName.toUpperCase()))
                    parkData.push(response.data[i]);
            }
        }
        else { // user didn't enter name for search
            parkData = response.data;
        }
        
        // Make parks table visible now that we have results
        $('#parksDataTable').css('visibility', 'visible');
         
        parkResultsTable = $('#parksDataTable').DataTable({
            "searching": false,
            "pageLength": 5,
            "lengthMenu": [5, 10, 15],
            "data": parkData,
            "language": {
                "emptyTable": "No search results"
            },
            "columns": [
                { "data": "fullName" },
                { "data": "designation" },
                { "data": "directionsUrl",
                    // render as hyperlink
                    "render": function(data, type, row, meta) {
                        if (type === 'display')
                            data = '<a href="' + data + '" target="_blank">' + "Directions" + '</a>';
                        return data;
                    }
                },
                {
                    "data": null,
                    "render": function(data, type, row, meta) {
                        return '<button id="visitorCentersBtn" type="button" onclick="getVisitorCenters(\'' + 
                            data.parkCode + 
                        '\')">Visitor Centers</button>' +
                        '<button id="campgroundsBtn" type="button" onclick="getCampgrounds(\'' + 
                            data.parkCode + 
                        '\')">Campgrounds</button>' +
                        '<button id="alertsBtn" type="button" onclick="getAlerts(\'' + 
                            data.parkCode + 
                        '\')">Alerts</button>' +
                        '<button id="articlesBtn" type="button" onclick="getArticles(\'' + 
                            data.parkCode + 
                        '\')">Articles</button>' + 
                        '<button id="newsBtn" type="button" onclick="getNews(\'' + 
                            data.parkCode + 
                        '\')">News</button>' + 
                        '<button id="eventsBtn" type="button" onclick="getEvents(\'' + 
                            data.parkCode + 
                        '\')">Events</button>' + 
                        '<button id="learnBtn" type="button" onclick="getLessons(\'' + 
                            data.parkCode + 
                        '\')">Learn More</button>';
                    }
                }
            ],
            "columnDefs": [
                { 
                    "orderable": false, // disable sorting on directions column
                    "targets": 2
                },
                { 
                    "orderable": false, // disable sorting on buttons column
                    "targets": 3
                }
            ],
            "destroy": true
        });
        
    });
}

function clearMoreInfo() {
    // clear the More Info section upon a new search
    $("#moreInfoTitle").empty();
    $("#moreInfoContent").empty();
}

function scrollToMoreInfo() {
    // scroll to the More Info section when results are returned
    $('html, body').animate({
        scrollTop: $("#moreInfo").offset().top
    }, 1000); // span of 1 second
}
