$.get("res/data.json").done(function (data) {
    mapHandler(data);
});

var mapHandler = function (data) {
    var map = L.map('mainmap').setView([41.90, 12.48], 11);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    }).addTo(map);

    var geojsonLayers = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var myIcon = L.divIcon({className: 'my-div-icon',
                html: '<img src="res/foto/' + feature.properties.thumb_url + '"/>'});
            return L.marker(latlng, {icon: myIcon});
        },
        onEachFeature: function (featureData, layer) {
            layer.on('mouseover', function (e) {
                this.openPopup();
            }).on('mouseout', function (e) {
                this.closePopup();
            }).on('click', function (e) {
                $('.modal-body-img img').attr('src', 'res/foto/' + featureData.properties.url);
                $('.modal-title').text(featureData.properties.name);
                $('.footer-content').text(featureData.properties.description);
                $('#myModal').modal('show');
            });
            layer.bindPopup("<p class='popup-metadata-title'>" + featureData.properties.name + "</p>" +
                "<p class='popup-metadata-desc'>" + featureData.properties.description + "</p></div>");
        }
    });

    // geojsonLayers.addTo(map);

    var markers = L.markerClusterGroup({showCoverageOnHover: false}).addLayers(geojsonLayers);
    map.addLayer(markers);
};
