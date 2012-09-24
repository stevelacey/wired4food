var map = new GMaps({
  div: '#map',
  lat: 51.452,
  lng: -2.6
});

var template = Handlebars.compile($('#infowindow-template').html());

$.ajax({
  url: 'api.php?location=Bristol, UK',
  dataType: 'json',
  success: function(data) {
    var c, e, i, latlngs = [];
    var excludes = ['bar', 'cafe', 'child', 'club', 'collectors', 'convenience', 'council', 'fast food', 'fish & chip', 'hotel', 'newsagents', 'pub', 'public house', 'restaurant', 'supermarket', 'take away', 'takeaway', 'universities'];

    for (i=0; i < data.length; i++) {
      var supplier = data[i], skip = false;

      for (e=0; e < excludes.length; e++) {
        var exclude = excludes[e];

        if (supplier.name.indexOf(exclude) !== -1) {
          skip = true;
        }
      }

      if (icon = categorisable(supplier.name)) {
        supplier.icon = icon;
      }

      if (supplier.categories) {
        for (c=0; c < supplier.categories.length; c++) {
          var category = supplier.categories[c].name.toLowerCase();

          if (icon = categorisable(category)) {
            supplier.icon = icon;
          }

          for (e=0; e < excludes.length; e++) {
            var exclude = excludes[e];

            if (category.indexOf(exclude) !== -1) {
              skip = true;
            }
          }
        }
      }

      if (skip) continue;

      var marker = map.addMarker({
        title: supplier.name,
        lat: supplier.location.latitude,
        lng: supplier.location.longitude,
        infoWindow: {
          content: template(supplier)
        }
      });

      latlngs.push(
        new google.maps.LatLng(
          supplier.location.latitude, supplier.location.longitude
        )
      );

      if (supplier.icon) {
        marker.setIcon(new google.maps.MarkerImage(
          '/images/' + supplier.icon + '.png',
          null,
          null,
          new google.maps.Point(16, 37),
          new google.maps.Size(32, 37)
        ));
      }
    }

    // map.fitBounds(latlngs);
  }
});

function categorisable(name) {
  var icon;

  if (name.indexOf('baker') !== -1) icon = 'baker';
  if (name.indexOf('butcher') !== -1) icon = 'butcher';
  if (name.indexOf('egg') !== -1) icon = 'eggs';
  if (name.indexOf('fish') !== -1) icon = 'fish';
  if (name.indexOf('grocer') !== -1) icon = 'grocery';

  return icon;
}