
var straightpath = anime.path('#straight_line');
var rect = document.getElementById('infoboxbot');
var middlescreen = ((parseInt(document.body.clientWidth) / 2) - (parseInt(rect.clientWidth) / 2)) +'px';

var speedtext = document.getElementById('speed');

var exit_sense = 24000;
var lane_change = 31000;
var stoptime = 40000;
var toptext = document.getElementById('infoboardtoptext');

anime({
	targets: "#arrow",
	translateX: straightpath('x'),
	translateY: straightpath('y'),
	rotation: straightpath('angle'),
	easing: 'linear',
	duration:stoptime
});



anime({
	targets: "#throttle",
	width: 50,
	delay:lane_change,
	duration:2000
});


anime({
	targets: "#infoboardbottext",
	scale: 1.8,
	delay:exit_sense,
	duration:5000,
});

anime({
	targets: "#infoboardtoptext",
	duration:exit_sense,
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
                    toptext.innerHTML = 'Izvoz v kratkem';
                    dist = 100;
                    setInterval(function() {dist=dist-10;
                    infobot.innerHTML = 'Razdalja do izvoza <br>' + dist + 'm';
                    if(dist<0){
                    	infobot.innerHTML = 'Zapuščanje avtoceste';
                    }
                	},1000);
                    
                }
});


anime({
	targets:"#navitext",
	duration:1,
	complete: function (anim) { 
					var navitext = document.getElementById('navitext');
					navitext.style.textAlign = 'center';
                    dist = 1600;
                    var disttoexit = setInterval(function() {dist=dist-10;
                    	if(dist<0){
                    		dist=0;
                    	clearInterval(disttoexit);
                    }
                    navitext.innerHTML = 'Razdalja do izvoza <br>' + dist + ' m';},1000);
                    
                }

})


anime({
	targets: speedtext,
	innerText: [77, "60"],
      easing: "linear",
      delay:lane_change,
      duration:3500,
      round: true,
      update: function(a) {
        const value = a.animations[0].currentValue;
        speedtext.innerHTML = value;
      }
});


/*
anime({
	targets:'#toptext',
	duration:overtake_sense+2000,
	complete: function (anim) { 
		toptext.style.color = 'blue';
		toptext.innerHTML = 'Izvajanje prehitevanja';
	}

})*/