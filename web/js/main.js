    var map = new GMaps({
      div: '#map',
      lat: 51.452,
      lng: -2.6
    });

    var template = Handlebars.compile($('#infowindow-template').html());
   
    var data = [];

    for (i in data) {
      var venue = data[i];

      var marker = map.addMarker({
        title: venue.name,
        lat: venue.location.lat,
        lng: venue.location.lng,
        infoWindow: {
          content: template(venue)
        }
      });
    }
