$( document ).ready(function() {

  var map = L.map('map').setView([39.1300, -84.5167], 12);


  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'jakeboyles.j0ajipap',
      accessToken: "pk.eyJ1IjoiamFrZWJveWxlcyIsImEiOiJNcGJpWXhJIn0.ONDjoScLnbU4_VVfXmeIAA",
  }).addTo(map);


  var markers = new L.FeatureGroup();
  var options = {
      'keepSpiderfied':true
  };

  var oms = new OverlappingMarkerSpiderfier(map, options);

  var companyIcon = L.icon({
      iconUrl: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png',

      iconSize:     [45, 55], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 54], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -86] // point from which the popup should open relative to the iconAnchor
  });

  var popup = new L.Popup();

  oms.addListener('click', function(marker) {
    popup.setContent(marker.desc);
    popup.setLatLng(marker.getLatLng());
    map.openPopup(popup);
  });

  var markers = new L.FeatureGroup();

  var addToMap = function(result)
  {
    result = result.breweries;
    result.forEach(function(brew){
            var loc = new L.LatLng(brew.loc[1],brew.loc[0]);

            var Icon = L.icon({
                iconUrl: brew.logo,
                iconSize:     [45, 55], // size of the icon
                shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [22, 54], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -86] // point from which the popup should open relative to the iconAnchor
            });

            var marker = new L.Marker(loc, {icon: Icon});
            
            marker.desc = `
            <b>${brew.name}</b>
            <p class='content'>
            <i class="fa fa-home"></i> ${brew.address}<br>
            <i class="fa fa-phone"></i> ${brew.phone}<br>
            </p>`;

            markers.addLayer(marker);
            
            oms.addMarker(marker);

          });

          map.addLayer(markers);

  }


var id = $('input').val();
  $.ajax({url: "/api/crawls/breweries/"+id, success: function(result){
      addToMap(result,false);
  }});

});
