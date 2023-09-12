
var straightpath = anime.path('#straight_line');
var rect = document.getElementById('infoboxbot');
var middlescreen = ((parseInt(document.body.clientWidth) / 2) - (parseInt(rect.clientWidth) / 2)-104) +'px';
console.log(middlescreen);
console.log(parseInt(document.body.clientWidth));
var speedtext = document.getElementById('speed');
var wholeduration = 18000;
var stoptime = 16000;
var brakepoint = 12000;
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
	width: 0,
	delay:brakepoint,
	duration:2000
});

anime({
	targets: "#brake",
	width: 100,
	delay:brakepoint,
	duration:4000
});


anime({
	targets: "#infoboxbot",
	translateX: middlescreen,
	translateY: '-40px',
	opacity:0.85,
	scale:3,
	delay:brakepoint+1000,
	duration:2000,
});

anime({
	targets: "#infoboardbottext",
	scale: 2,
	delay:brakepoint+1000,
	duration:2000,
});

anime({
	targets: "#infoboardtoptext",
	duration:brakepoint,
	complete: function (anim) { 
					var charging = document.getElementById('charging');
					var consumption = document.getElementById('consumption');
					var infobot = document.getElementById('infoboardbottext');
					infobot.style.textAlign = 'center';
					toptext.style.textAlign = 'center';
					infobot.style.color = 'red';
					toptext.style.color = 'red';
					consumption.remove();
					charging.remove(); 
                    toptext.innerHTML = 'nepričakovana ustavitev prometa';
                    infobot.innerHTML = '!!zasilno zaviranje!!';
                }
});

anime({
	targets: speedtext,
	innerText: [80, "0"],
      easing: "linear",
      delay:12000,
      duration:4000,
      round: true,
      update: function(a) {
        const value = a.animations[0].currentValue;
        speedtext.innerHTML = value;
      }
});

