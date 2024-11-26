import http from 'k6/http';
import {sleep, check} from 'k6';
import {randomIntBetween} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {findBetween} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// Consumir archivos CVS
import {SharedArray} from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

/*
export let options = {
    stages: [
        // Cantidad de usuarios a subir en un tiempo x
        {target: 10, duration: '30s'}, //ramUp
        {target: 10, duration: '3m'},  // etapa estable
        {target: 40, duration: '15s'}, //ramUp
        {target: 40, duration: '40s'}, //Etapa estable prueba de pico
        {target: 5, duration: '5s'}, //ram down prueba pico
        {target: 5, duration: '1m'}, //Etapa estable prueba de pico recuperación
        {target: 0, duration: '5s'}, // rampDown finalización
    ],
}
    */

export default function(){
    let response = http.get('https://reqres.in/api/users');
    console.log("Request enviado: ",response);
    console.log("Body del response: ",response.body);
    console.log("El status code: ",response.status);

    sleep(randomIntBetween(1,30)); //toma un dato random entre 1 y 3

    //Validaciones

    check(response,{
        'Validación código de respuesta 200': (r)=> r.status ===200,

        'validación de texto': (r)=> r.body.includes('"email":"george.bluth@reqres.in"'),
    });

    const user_email = findBetween(response.body,'"id":1,"email":','"first_name"') // captura la variable email del body
    console.log("La variable capturada es : ",user_email)


}

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }