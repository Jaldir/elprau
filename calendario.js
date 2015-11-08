
    var reglas = {
        "2015": {
            "10": {             //noviembre
                "2": "Seminario",
                "12": "Mesa redonda"
            },
            "11": {             //diciembre
                "3": "Taller",
                "20": "Conferencia"
            }
        }  
    };
    
    
    YUI({lang: 'es'}).use( 'calendar', function(Y){

        var YDate = Y.DataType.Date;
        
         //Asociamos el calendario al contenedor HTML
         var calendario = new Y.Calendar( {
             contentBox: '#calendario'
            } );

        
        function miFuncionRender( fecha, nodo, reglas ){

            if (Y.Array.indexOf(reglas, 'Conferencia') !== -1){

                nodo.setStyles( { backgroundColor: '#F22', color: '#FFF'}); 

            } else if( Y.Array.indexOf(reglas, 'Taller' ) !== -1){
                nodo.setStyles( { backgroundColor: 'blue', color: '#FFF'});
            } else if(Y.Array.indexOf(reglas, 'Seminario' ) !== -1){
                nodo.setStyles( { backgroundColor: 'green', color: '#FFF'});
            }
            else if(Y.Array.indexOf(reglas, 'Mesa redonda' ) !== -1){
                nodo.setStyles( { backgroundColor: 'purple', color: '#FFF'});
            }
        }

            //Asignamos las reglas al calendario
             calendario.set('customRenderer', { rules: reglas, filterFunction: miFuncionRender});

            //Mostramos el calendario.
             calendario.render();
        
            //seleccionamos el día actual
             calendario.selectDates( new Date() );


    //Reaccionamos cada vez que se modifica la selección
    calendario.after('selectionChange', function(ev){
        //Array que contiene las fechas seleccionadas  
        var seleccion = ev.newSelection;

        console.log(YDate.format( seleccion, { format: '%d %B %Y' } ));
        
        Y.one('#seleccion').setHTML('');

        Y.Array.each( seleccion, function( fecha ){
            var toappend="";
            switch (fecha.getTime()) {
                    
                case Y.Date.parse("November 02, 2015 12:00:00").getTime():
                    toappend="<div class='staff'><h3>Seminario: Pintura Neoclásica</h3><p>Déjate guiar a través de las pinceladas de los más grandes artitas de aquel tiempo. Desde Van hasta Gogh, este seminario es una parada imprescindible en tu tour.</p><p>Lugar: Aula 29 del edificio C, El Prao (Madrid)</p><p>Fecha: 2 de Noviembre 2015. 19:30-21:00</p></div>";
                    break;
                    
                case Y.Date.parse("November 12, 2015 12:00:00").getTime():
                    toappend="<div class='staff'><h3>Mesa redonda: Calendario románico o visigodo</h3><p>Uno de los mayores debates de la historia será revivido en este evento. Buscamos acercar detractores con detractores, y visigodos con romanos. Todo, por supuesto, desde un punto de vista cultural y festivo de tolerancia.</p><p>Lugar: Sala 10 del edificio A, El Prao (Madrid)</p><p>Fecha: 12 de Noviembre 2015. 12:30-16:00</p></div>"
                    break;
                    
                 case Y.Date.parse("December 3, 2015 12:00:00").getTime():
                    toappend="<div class='staff'><h3>Taller: Fotografía en cuadros</h3><p>Aprende a fotografiar tus cuadros favoritos. Todo el arte, sin el relieve del pincel.</p><p>Lugar: Sala Gabriel Pintor, Paseo de la Castellana, 10 (Madrid)</p><p>Fecha: 3 de Diciembre 2015. Este evento empezará a las 10 y tendrá una duración de 7 horas.</p></div>"
                    break;
                    
                case Y.Date.parse("December 20, 2015 12:00:00").getTime():
                    toappend="<div class='staff'><h3>Conferencia: Trenes en los 80</h3><p>Un paseo por la creación artística de los años 80, con especial hincapié con motivo de nuestra exposición del ferrocarril en aquellos artefactos.</p><p>Lugar: Museo del Prao (Madrid)</p><p>Fecha: 20 de Diciembre 2015. 17:00-18:00</p></div>"
                    break;
                    
                default: 
                    toappend="<p>Lo sentimos, no hay ningún evento en la fecha seleccionada.</p>"
            }
            Y.one('#seleccion').append(toappend);
        });
    });
});