$(document).on('dragenter', function (e){
    e.stopPropagation();
    e.preventDefault();
});

$(document).on('dragover', function (e){
  e.stopPropagation();
  e.preventDefault();
});

$(document).on('drop', function (e){
    e.stopPropagation();
    e.preventDefault();
});

var obj = $("#drop_zone");

obj.on('dragenter', function (e){
    e.stopPropagation();
    e.preventDefault();
    $(this)
        .css('border-color', '#FF5733')
        .css('color', '#FF5733');

});

obj.on('dragexit',function(e){
    $(this)
        .css('border-color', '#343A40')
        .css('color', '#343A40');
});

obj.on('dragover', function (e){
     e.stopPropagation();
     e.preventDefault();
});

obj.on('drop', function (e){

    $(this)
        .css('border-color', '#343A40')
        .css('color', '#343A40');

    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files;

    //We need to send dropped files to Server
    readFile(files[0]);
});

function readFile(file){

    var reader = new FileReader();
    reader.onload = function(event){

        //100%

        var xmlFile = $.parseXML(event.target.result);
        var $xml = $(xmlFile);
        var $ejercicio = $xml.find("ejercicio");

        $('.drag-n-drop').animate({
            height: '100px'
        },1000);

        $('.dnd-text').html('Arrastra una rutina para añadirla.');

        $('#rutina_zone').removeAttr('hidden');

        $('.nombre-rutina').html($xml.find('rutina > nombre').text())

        $ejercicio.each(function(){

            var nombre = $(this).find("nombre").text();
            var series = $(this).find("series").text();
            var descripcion = $(this).find("descripcion").text();
            var descanso = $(this).find("series").attr('descanso');

            //O repeticiones o tiempo cronometrado
            if($(this).find("repeticiones").length === 0){
              //tiempo
              var tiempo = $(this).find("tiempo").text();
              presentarEjercicio(nombre,tiempo,series,descripcion,descanso,true);
            }else{
              //repeticiones
              var reps = $(this).find("repeticiones").text();
              presentarEjercicio(nombre,reps,series,descripcion,descanso,false);
            }

            var reposo = $(this).attr('descanso');
            if(reposo != undefined){
              presentarDescanso(reposo);
            }

        });

    };

    reader.onloadstart = function(event){
        // 0%

    };

    reader.onerror = function(event){
        console.log("error!");
    };

    reader.readAsText(file);
}
