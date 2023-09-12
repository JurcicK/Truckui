function calculateRouteFromAtoB(platform) {
  var router = platform.getRoutingService(null, 8),
      routeRequestParams = {
        routingMode: 'fast',
        transportMode: 'car',
        origin: '46.073196,14.459395', // Brandenburg Gate
        destination: '52.5206,13.3862', // Friedrichstraße Railway Station
        return: 'polyline,turnByTurnActions,actions,instructions,travelSummary'
      };

  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );
}


function onSuccess(result) {
  var route = result.routes[0];
  addRouteShapeToMap(route);
  createNaviArrow(route);

}

function onError(error) {
  alert('Can\'t reach the remote server');
}

var mapContainer = document.getElementById('mapContainer');

var platform = new H.service.Platform({
  apikey: 'bnUK00gnh7AmGxxcmrK8DQER6Om5NWHaQVaP-embqew'
});

var engineType = H.Map.EngineType['HARP'];
var style = new H.map.render.harp.Style('https://jurcick.github.io/nighttruckui.json');
var vectorLayer = platform.getOMVService().createLayer(style, { engineType });

var map = new H.Map(document.getElementById('mapContainer'),
  vectorLayer, {
  engineType,
  center: {lat: 46.073196, lng: 14.459395},
  zoom: 16,
  pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());

//interkativnost mape
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


//ustvari polyline objekt poti
function addRouteShapeToMap(route) {
  route.sections.forEach((section) => {
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    let polyline = new H.map.Polyline(linestring, {
      style: {
        lineWidth: 10,
        strokeColor: 'rgba(0, 128, 255, 0.7)'
      }
    });

    map.addObject(polyline);

  });
}

function createNaviArrow(route){
	var svgMarkup = '<svg width="50"  height="40" style="left: -23px; top: -25px;" viewBox="0 0 90 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.10038 70.0948L43.6051 1.35863C44.0088 0.705873 44.9807 0.758133 45.3436 1.45211L81.0967 69.8201C81.5882 70.7599 80.4979 71.6947 79.6377 71.071L46.154 46.7888C45.8292 46.5533 45.4003 46.5287 45.0609 46.7262L2.47302 71.5018C1.5774 72.0229 0.555722 70.9756 1.10038 70.0948Z" fill="#2697FF"/></svg>',
    arrow = new H.map.DomIcon(svgMarkup);

    var arrowIcon = new H.map.DomMarker({lat: 46.073196, lng: 14.459395}, {
    	icon:arrow
    });
    map.addObject(arrowIcon);

    setTimeout(updateArrow, 500);
    setInterval(updateArrow, 500);
    let poly = 0;

    route.sections.forEach((section) => {
    	 poly = H.geo.LineString.fromFlexiblePolyline(section.polyline).getLatLngAltArray();
    	});
    console.log(poly);
    /*
    function updateArrow(){
    	ease(
    		arrowIcon.getGeometry(),
    		{lat:poly[poly.length-3], lng:poly[poly.length-2]},
    		poly,
    		4000,
    		function(coord){
    			arrowIcon.setGeometry(coord);
    		})
    }*/
}

calculateRouteFromAtoB(platform);