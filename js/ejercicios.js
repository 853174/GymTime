var eI = 0;
var eActual = 0;
var sI = 0;
var sActual = 0;
var deDescanso = false;

function secToMinSec(secs){

	var m = Math.floor(secs/60);
	var s = secs % 60;
	return [m,s];
}

function secToString(secs){

	ms = secToMinSec(secs);

	var s = "";
	if(ms[0] !== 0){
		s += ms[0] + " minutos"
	}

	if(ms[1] !== 0){
		if(s !== "")
			s += " ";

		s += ms[1] + " segundos"
	}

	return s;
}

function presentarDescanso(reposo){

	if(reposo !== undefined){

		$('#ejercicios')
			.append("<div class='card border-secondary text-secondary mt-3 ejercicio' id='"+eI+"'>\
					  <div class='card-header clearfix'>\
					    <span class='float-left nombre-ejercicio'>Descanso</span> \
					    <span class='float-right'>\
					      <span class='badge badge-secondary'><span class='descanso-ejercicio' data-secs='"+reposo+"'>"+secToString(reposo)+"</span></span>\
					    </span>\
					  </div>\
					</div>\
				");

		eI++;
	}

}


/*
EJERCICIO PENDIENTE

<div class='card border-secondary text-secondary mt-3 ejercicio' id='X'>
  <div class='card-header clearfix'>
    <span class='float-left nombre-ejercicio'>[EJERCICIO#1]</span>
    <span class='float-right'>
      <span class='badge badge-secondary'><span class='repeticion-ejercicio'>[REPETICION#1]</span> repeticiones</span>
      <span class='align-middle'> × </span>
      <span class='badge badge-secondary'><span class='serie-ejercicio'>[SERIE#1]</span> series</span>
    </span>
  </div>
  <div class='card-body'>
    <b>Descripción: </b><br>
    <span class='descripcion-ejercicio'>[DESCRIPCION#1]</span>
  </div>
</div>
*/

function pendiente(id){

}

function presentarEjercicio(nombre,reps,series,descripcion,descanso,cronometrado){


	$('#ejercicios')
		.append("<div class='card border-secondary text-secondary mt-3 ejercicio' id='"+eI+"'>\
				  <div class='card-header clearfix'>\
				    <span class='float-left nombre-ejercicio'>"+nombre+"</span> \
				    <span class='float-right repeticiones'>\
				    </span>\
				  </div>\
				</div>\
			");

	if(cronometrado){
		$('#' + eI + ' .repeticiones').append("\
				<span class='badge badge-secondary'><span class='tiempo-ejercicio' data-tiempo="+reps+">"+secToString(reps)+"</span></span>\
				<span class='align-middle'> × </span>\
				<span class='badge badge-secondary'><span class='serie-ejercicio'>"+series+"</span> series</span>");
		 $('#' + eI).attr('cronometrado',true);
	}else{
		$('#' + eI + ' .repeticiones').append("\
			<span class='badge badge-secondary'><span class='repeticion-ejercicio'>"+reps+"</span> repeticiones</span>\
			<span class='align-middle'> × </span>\
			<span class='badge badge-secondary'><span class='serie-ejercicio'>"+series+"</span> series</span>")
		$('#' + eI).attr('cronometrado',false);
	}

	if(descripcion !== "" || descanso !== undefined){
		$('#'+eI)
			.append("<div class='card-body'></div>");
	}

	if(descanso !== undefined){
		$('#'+eI +" .card-body")
			.append("<div>\
						<b>Descanso entre series: </b><br>\
						<span class='descanso-serie' data-secs='"+descanso+"'>"+secToString(descanso)+"</span>\
					</div>");
	}

	if(descripcion !== ""){
		$('#'+eI +" .card-body")
			.append("<div>\
				    	<b>Descripción: </b><br>\
				    	<span class='descripcion-ejercicio'>"+descripcion+"</span>\
				  	</div>");
	}

	eI++;
}

/*
EJERCICIO ACTIVO

<div class='card bg-primary text-white mt-3 ejercicio' id='X'>
  <div class='card-header clearfix'>
    <span class='float-left nombre-ejercicio'>[EJERCICIO#1]</span>
    <span class='float-right'>
      <span class='badge badge-light'><span class='repeticion-ejercicio'>[REPETICION#1]</span> repeticiones</span>
      <span class='align-middle'> × </span>
      <span class='badge badge-light'><span class='serie-ejercicio'>[SERIE#1]</span> series</span>
    </span>
  </div>
  <div class='card-body'>
    <b>Descripción: </b><br>
    <span class='descripcion-ejercicio'>[DESCRIPCION#1]</span>
  </div>
</div>
*/

function activar(id){
	$('#' + id + '.ejercicio')
		.removeClass('border-secondary')
		.removeClass('text-secondary')
		.addClass('bg-primary')
		.addClass('text-white');

	$('#' + id + '.ejercicio .badge-secondary')
		.removeClass('badge-secondary')
		.addClass('badge-light');

}


/*
EJERCICIO COMPLETADO

<div class="card border-success text-success mt-3 ejercicio" id="X">
  <div class="card-header clearfix">
    <span class="float-left nombre-ejercicio">[EJERCICIO#1]</span>
    <span class="float-right">
      <span class="badge badge-success"><span class="repeticion-ejercicio">[REPETICION#1]</span> repeticiones</span>
      <span class="align-middle"> × </span>
      <span class="badge badge-success"><span class="serie-ejercicio">[SERIE#1]</span> series</span>
    </span>
  </div>
  <div class="card-body">
    <b>Descripción: </b><br>
    <span class="descripcion-ejercicio">[DESCRIPCION#1]</span>
  </div>
</div>
*/

function completar(id){
	$('#' + id + '.ejercicio')
		.removeClass('bg-primary')
		.removeClass('text-white')
		.addClass('border-success')
		.addClass('text-success');

	$('#' + id + '.ejercicio .badge-light')
		.removeClass('badge-light')
		.addClass('badge-success');

}

$(document).ready(function(){
	/*presentarEjercicio('Ej1',10,5,'No se que.. No se cual...');
	presentarEjercicio('Ej2',10,5,'No se que.. No se cual...');*/
});


/* CONTROLES */

function iniciar(){
	eActual = 0;

	$('#iniciarRutina').hide();
	$('#hacerDescanso').removeAttr('hidden');

	$('#progRutina').css('width','0%');

	iniciarEjercicio();
}

function iniciarEjercicio(){

	//Mostrar el ejercicio
	$('#ejercicios').animate({
		scrollTop: $('#' + eActual).offset().top
	})

	$('#progEjercicio').css('width','0%');

	activar(eActual);

	$('.eActual').html(eActual);
	$('.eI').html(eI);

	$('.ejercicio-actual').html($('#' + eActual + ' .nombre-ejercicio').text())

	$('#progreso').removeAttr('hidden');

	var descanso;
	if($('#' + eActual).find('.descanso-ejercicio').length !== 0){
		// Es un descanso

		descanso = $('#' + eActual+ ' .descanso-ejercicio').data('secs');
		var ms = secToMinSec(descanso);
		setTimer(ms[0],ms[1]);
		startCountDown();
		$('#hacerDescanso').html('Pausar descanso');

		sI = 1;
		sActual = 0;

		$('.progEjercicio').hide();

	}else if($('#' + eActual).find('.descanso-serie').length !== 0){
		// Es un ejercicio

		$('.progEjercicio').show();

		var cronometrado = $('#' + eActual).attr('cronometrado')  == "true";

		if(cronometrado){

			//Preparar inicio de ejercicio
			var tiempo = $('#' + eActual + " .tiempo-ejercicio").data('tiempo');
			$('#hacerDescanso').html('Comenzar ejercicio');
			var ms = secToMinSec(tiempo);
			setTimer(ms[0],ms[1]);

			//Preparar series
			sI = $('#' + eActual + ' .serie-ejercicio').text();
			sActual = 0;


		}else{

			sI = $('#' + eActual + ' .serie-ejercicio').text();
			sActual = 0;

			//Una unica serie?
			if(sI == 1){
				//Si
				$('#hacerDescanso').html('Siguiente ejercicio');
				setTimer(0,0);
			}else{
				//No
				descanso = $('#' + eActual + " .descanso-serie").data('secs');
				$('#hacerDescanso').html('Hacer descanso');
				var ms = secToMinSec(descanso);
				setTimer(ms[0],ms[1]);
			}
		}
	}else{
		sI = 1;
		sActual = 0;
		setTimer(0,0);
		$('#hacerDescanso').html('Siguiente ejercicio');
	}

	$('.sActual').html(sActual);
	$('.series').html(sI);
}

function siguiente(){

	//Tratamiento especial para los ejercicios cronometrados
	var cronometrado = $('#' + eActual).attr('cronometrado')  == "true";

	if(cronometrado){

		var ms;

		if(deDescanso){
			//Viene de hacer un descanso, a hacer una serie
			var tiempo = $('#' + eActual + " .tiempo-ejercicio").data('tiempo');
			ms = secToMinSec(tiempo);

			//No toca descanso
			deDescanso = false;
		}else{
			//Ha acabado el tiempo de una serie, toca descanso
			var descanso = $('#' + eActual + " .descanso-serie").data('secs');
			ms = secToMinSec(descanso);
			sActual++;
			deDescanso = true;

		}

		if(sActual == sI){
			siguienteEjercicio();
		}else{
			setTimer(ms[0],ms[1]);
			startCountDown();
		}

	}else{
		sActual++;

		if(sActual == sI){
			siguienteEjercicio();
		}else if( sI - sActual == 1){
			setTimer(0,0);
			$('#hacerDescanso').html('Siguiente ejercicio');
		}else{
			var descanso = $('#' + eActual + " .descanso-serie").data('secs');
			var ms = secToMinSec(descanso);
			setTimer(ms[0],ms[1]);
			$('#hacerDescanso').html('Hacer descanso');
		}
	}

	$('.sActual').html(sActual);
	$('#progEjercicio').css('width',((sActual/sI)*100)+'%');

}

function siguienteEjercicio(){
	completar(eActual);
	eActual++;
	$('#progRutina').css('width',((eActual/eI)*100) + '%');
	if(eActual < eI){
		iniciarEjercicio();
	}else{
		finalizar();
	}
}

function finalizar(){
	$('#hacerDescanso').hide();
	$('#progreso').attr('hidden','hidden');
	document.getElementById('fin').play()
}

$(document).ready(function(){

	$('#hacerDescanso').click(function(){

		if(status == 1){
			pauseTimer();
			$(this).html('Reanudar');
		}else{
			startCountDown();
			$(this).html('Pausar');
		}

	});

});
