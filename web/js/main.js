    var map = new GMaps({
      div: '#map',
      lat: 51.452,
      lng: -2.6
    });

    var template = Handlebars.compile($('#infowindow-template').html());
   
    $.ajax({
      url: 'businesses.json',
      dataType: 'json',
      success: function(data) {
        var data = data.data, c, i;
        
        var excludes = ['bar', 'cafe', 'child', 'club', 'collectors', 'convenience', 'council', 'fast food', 'fish & chip', 'hotel', 'newsagents', 'pub', 'public house', 'restaurant', 'supermarket', 'take away', 'takeaway', 'universities'];

        for (i=0; i < data.length; i++) {
          var supplier = data[i], skip = false;

          for (c=0; c < supplier.categories.length; c++) {
            var category = supplier.categories[c].name.toLowerCase();

            for (e=0; e < excludes.length; e++) {
              var exclude = excludes[e];

              if (category.indexOf(exclude) !== -1) {
                skip = true;
              }
            }
          }

          if (skip) {
           continue;
         } else {
           console.log(category);
         }

          var location = supplier.location.split(',');
          
          supplier.location = {
            lat: parseFloat(location[0]),
            lng: parseFloat(location[1])
          }

          var marker = map.addMarker({
            title: supplier.name,
            lat: supplier.location.lat,
            lng: supplier.location.lng,
            infoWindow: {
              content: template(supplier)
            }
          });
        }
      }
    });
