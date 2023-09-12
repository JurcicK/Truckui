
var straightpath = anime.path('#straight_line');
var rect = document.getElementById('infoboxbot');
var middlescreen = ((parseInt(document.body.clientWidth) / 2) - (parseInt(rect.clientWidth) / 2)) +'px';

var speedtext = document.getElementById('speed');
var wholeduration = 18000;
var stoptime = 16000;
var overtake_sense = 12000;
var toptext = document.getElementById('infoboardtoptext');
anime({
	targets: "#arrow",
	translateX: straightpath('x'),
	translateY: straightpath('y'),
	rotation: straightpath('angle'),
	easing: 'linear',
	duration:(stoptime+10000)
});

anime({
	targets: "#throttle",
	width: 100,
	delay:overtake_sense+2000,
	duration:2000
});



anime({
	targets: "#infoboardbottext",
	scale: 2,
	delay:overtake_sense,
	duration:5000,
});

anime({
	targets: "#infoboardtoptext",
	duration:overtake_sense,
	complete: function (anim) { 
					var charging = document.getElementById('charging');
					var consumption = document.getElementById('consumption');
					var infobot = document.getElementById('infoboardbottext');
					infobot.style.textAlign = 'center';
					toptext.style.textAlign = 'center';
					infobot.style.color = 'blue';
					toptext.style.color = 'blue';
					consumption.remove();
					charging.remove(); 
					infobot.innerHTML = '';
                    toptext.innerHTML = 'Počasnejše vozilo spredaj';
                    dist = 100;
                    var disttoovertake = setInterval(function() {dist=dist-10;
                    	if (dist<=0) {
                    		dist=0;
                    		clearInterval(disttoovertake);
                    	}
                    infobot.innerHTML = 'Razdalja do vozila <br>' + dist + 'm';},1000);
                    
                }
});


anime({
	targets:'#toptext',
	duration:overtake_sense+2000,
	complete: function (anim) { 
		toptext.style.color = 'blue';
		toptext.innerHTML = 'Izvajanje prehitevanja';
	}

})

anime({
	targets: speedtext,
	innerText: [77, "80"],
      easing: "linear",
      delay:12000,
      duration:4000,
      round: true,
      update: function(a) {
        const value = a.animations[0].currentValue;
        speedtext.innerHTML = value;
      }
});