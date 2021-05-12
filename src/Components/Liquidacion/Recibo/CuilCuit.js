
import React from 'react';
import PDF from './PDF';

// falta arreglar para general el cuil

class CuilCuit extends React.Component {
   
    constructor(props) {

        super(props);
        this.state = {
            dni : props?.dni,
            
        
        };
    }

 render(){
 
      return(
         
<p></p>
        );
        <getCuilCuit/>
    }
}
export default CuilCuit;

function getCuilCuit(document_number, gender) {
    /**
     * Cuil format is: AB - document_number - C
     * Author: Nahuel Sanchez, Woile
     *
     * @param {str} document_number -> string solo digitos
     * @param {str} gender -> debe contener HOMBRE, MUJER o SOCIEDAD
     *
     * @return {str}
     **/
    "use strict";
    const HOMBRE = ["HOMBRE", "M", "MALE"],
      MUJER = ["MUJER", "F", "FEMALE"],
      SOCIEDAD = ["SOCIEDAD", "S", "SOCIETY"];
    let AB, C;
  
    /**
     * Verifico que el document_number tenga exactamente ocho numeros y que
     * la cadena no contenga letras.
     */
    if (document_number.length != 8 || isNaN(document_number)) {
      if (document_number.length == 7 && !isNaN(document_number)) {
        document_number = "0".concat(document_number);
      } else {
        // Muestro un error en caso de no serlo.
        throw "El numero de document_number ingresado no es correcto.";
      }
    }
  
    /**
     * De esta manera permitimos que el gender venga en minusculas,
     * mayusculas y titulo.
     */
    gender = gender.toUpperCase();
  
    // Defino el valor del prefijo.
    if (HOMBRE.indexOf(gender) >= 0) {
      AB = "20";
    } else if (MUJER.indexOf(gender) >= 0) {
      AB = "27";
    } else {
      AB = "30";
    }
  
    /*
     * Los numeros (excepto los dos primeros) que le tengo que
     * multiplicar a la cadena formada por el prefijo y por el
     * numero de document_number los tengo almacenados en un arreglo.
     */
    const multiplicadores = [3, 2, 7, 6, 5, 4, 3, 2];
  
    // Realizo las dos primeras multiplicaciones por separado.
    let calculo = parseInt(AB.charAt(0)) * 5 + parseInt(AB.charAt(1)) * 4;
  
    /*
     * Recorro el arreglo y el numero de document_number para
     * realizar las multiplicaciones.
     */
    for (let i = 0; i < 8; i++) {
      calculo += parseInt(document_number.charAt(i)) * multiplicadores[i];
    }
  
    // Calculo el resto.
    let resto = parseInt(calculo) % 11;
  
    /*
     * Llevo a cabo la evaluacion de las tres condiciones para
     * determinar el valor de C y conocer el valor definitivo de
     * AB.
     */
    if (SOCIEDAD.indexOf(gender) < 0 && resto == 1) {
      if (HOMBRE.indexOf(gender) >= 0) {
        C = "9";
      } else {
        C = "4";
      }
      AB = "23";
    } else if (resto === 0) {
      C = "0";
    } else {
      C = 11 - resto;
    }
    const example = `${AB}-${document_number}-${C}`;
    // Show example
    console.log(example);
  
    // Generate cuit
    const cuil_cuit = `${AB}${document_number}${C}`;
    return cuil_cuit;
  }