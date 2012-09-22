var map = new GMaps({
  div: '#map',
  lat: 51.452,
  lng: -2.6
});

var template = Handlebars.compile($('#infowindow-template').html());
   
$.ajax({
  url: 'api.php',
  dataType: 'json',
  success: function(data) {
    var c, i;
    var excludes = ['bar', 'cafe', 'child', 'club', 'collectors', 'convenience', 'council', 'fast food', 'fish & chip', 'hotel', 'newsagents', 'pub', 'public house', 'restaurant', 'supermarket', 'take away', 'takeaway', 'universities'];

    for (i=0; i < data.length; i++) {
      var supplier = data[i], skip = false;

          for (e=0; e < excludes.length; e++) {
            var exclude = excludes[e];

            if (supplier.name.indexOf(exclude) !== -1) {
              skip = true;
            }
          }

          if (supplier.name.indexOf('baker') !== -1) supplier.icon = 'baker';
          if (supplier.name.indexOf('butcher') !== -1) supplier.icon = 'butcher';
          if (supplier.name.indexOf('egg') !== -1) supplier.icon = 'eggs';
          if (supplier.name.indexOf('fish') !== -1) supplier.icon = 'fish';
          if (supplier.name.indexOf('grocer') !== -1) supplier.icon = 'grocery'; 

      if (supplier.categories) {
        for (c=0; c < supplier.categories.length; c++) {
          var category = supplier.categories[c].name.toLowerCase();

          if (category.indexOf('baker') !== -1) supplier.icon = 'baker';
          if (category.indexOf('butcher') !== -1) supplier.icon = 'butcher';
          if (category.indexOf('egg') !== -1) supplier.icon = 'eggs';
          if (category.indexOf('fish') !== -1) supplier.icon = 'fish';
          if (category.indexOf('grocer') !== -1) supplier.icon = 'grocery';

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
  }
});
