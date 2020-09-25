
var milis = 0,
	secs = 0,
	mins = 0;

var status = 0;
	/*
	0 = STOPPED, 00:00
	1 = STARTED
	2 = PAUSED
	*/

var timer;

$(document).ready(function(){

	var btnA = $('#btnA');
	var btnB = $('#btnB');

	btnA.click(function(){

		if(status == 1){
			// Si está en marcha, pause
			pauseTimer();
			//Mostrar boton de play
			$('#bntAimg').attr('src','img/play-dark.png')
			//Mostrar boton de eliminar
			$('#bntBimg').attr('src','img/trash-dark.png')
		}else{
			// Si está parado, empezar
			startTimer();
			//Mostrar boton de pausa
			$('#bntAimg').attr('src','img/pause-dark.png')
			//Mostrar boton de restart
			$('#bntBimg').attr('src','img/restart-dark.png')
		}


	});

	btnB.click(function(){

		if(status == 1){
			// Si está en marcha, restart
			restartTimer();

		}else{
			// Si esta parado, reset
			stopTimer();

		}

	});

})

function setTimer(min,sec){
	mins = min;
	secs = sec;
	showTime();
}

function startCountDown(){
	if(status == 0){
		timer = setInterval('clockDown()',10);
	}

	status = 1;

}

function startTimer(){

	if(status == 0){
		timer = setInterval('clockUp()',10);
	}

	status = 1;

}

function pauseTimer(){
	status = 2;
}

function stopTimer(){

	status = 0;
	mins = 0;
	secs = 0;
	milis = 0;
	clearInterval(timer);
	showTime();

}

function restartTimer(){

	stopTimer();
	startTimer();

}

function clockUp(){

	if(status == 1){
		milis++;

		if(milis == 100){
			milis = 0;
			secs++;
		}

		if(secs == 60){
			secs = 0;
			mins++;
		}

		showTime();
	}

}

function clockDown(){

	if(status == 1){
		if(milis == 0){
			milis = 99;

			if(secs == 0){
				secs = 59;
				if(mins == 0){
					stopTimer();
					alarma();
					siguiente();
				}else{
					mins--;
				}
			}else{
				secs--;
			}
		}else{
			if((secs == 2 || secs == 1 || secs == 0) && milis == 99 && mins == 0){
				aviso();
			}

			milis--;
		}



		showTime();
	}

}

function showTime(){
	$('#mili').html(("0" + milis).slice(-2));
	$('#sec').html(("0" + secs).slice(-2));
	$('#min').html(("0" + mins).slice(-2));
}

function aviso(){
	document.getElementById('pitido-corto').play()
}

function alarma(){
	document.getElementById('pitido-largo').play()
}
