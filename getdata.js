getData();
function getData(){
	fetch("https://jurcick.github.io/example_data.json")
	.then(response => response.json())
	.then(data => populateUI(data));
}

function populateUI(data){
	var drive_time = document.getElementById('driving_time');
	var remaining_time = document.getElementById('remaining_time');

	var distance_empty = document.getElementById('dist_to_fill');
	var consumption = document.getElementById('consumption_km');

	var clock = document.getElementById('clock');
	var throttle = document.getElementById('throttle');
	var brake = document.getElementById('brake');

	var pgear = document.getElementById('park_gear');
	var ngear = document.getElementById('neutral_gear');
	var dgear = document.getElementById('drive_gear');
	var rgear = document.getElementById('reverse_gear');
	var gears = {"P" : pgear, "N": ngear,"D": dgear,"R": rgear};

	var speed = document.getElementById('speed');

	drive_time.innerHTML = data.drivingTimes.dailyDrive + " / " + data.drivingTimes.dailyTotal;
	var splittime = data.drivingTimes.untilBreakhrs.split(":");
	remaining_time.innerHTML = parseInt(splittime[0]) + " hr " + parseInt(splittime[1]) + " min";

	clock.innerHTML = data.time;
	speed.innerHTML = data.speed;
	for (const [key, value] of Object.entries(gears)) {
	  if(key == data.engagedGear){
	  	value.style.color = "#2697FF";
	  }
	  else{
	  	value.style.color = "white";
	  }
	}

	

}

