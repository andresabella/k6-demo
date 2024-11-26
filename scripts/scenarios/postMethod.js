import http from 'k6/http';
import {sleep, check} from 'k6';
import {randomIntBetween} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import {findBetween} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
// Consumir archivos CVS
import {SharedArray} from 'k6/data'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'

const url = 'https://reqres.in/api/login'

const request = JSON.stringify({

    "email": "george.bluth@reqres.in",
    "password": "pass123"
})

const params ={
    headers: {
        'Content-Type': 'application/json'
    }
}
export default function(){
    let response = http.post(url, request,params);
    console.log("Request enviado: ",response);
    console.log("Body del response: ",response.body);
    console.log("El status code: ",response.status);

    sleep(randomIntBetween(1,30)); //toma un dato random entre 1 y 3

    //Validaciones

    const token = findBetween(response.body,'"token":"','"}') // captura la variable email del body
    console.log("El token capturado es : ",token)
    
    /*
    Ejemplo de como usar una variable capturada
    
    const body =
        `
        "email": "george.bluth@reqres.in",
        "password": "pass123"
        "token": ${token}
        `
    
    /*

    check(response,{
        'Validación código de respuesta 200': (r)=> r.status ===200,

        'validación de texto': (r)=> r.body.includes('"email":"george.bluth@reqres.in"'),
    });

    

*/
}