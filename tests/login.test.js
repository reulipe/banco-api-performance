import http from 'k6/http';
import { sleep, check } from 'k6';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export const options = {
    //iterations: 50, // número total de iterações a serem executadas
    //vus: 10, // número de usuários virtuais
    //duration: '30s', // duração do teste
    stages: [
        { duration: '5s', target: 10 }, // ramp-up para 10 usuários em 5 segundos
        { duration: '20s', target: 10 }, // manter 10 usuários por 20 segundos
        { duration: '5s', target: 0 }, // ramp-down para 0 usuários em 5 segundos
    ],        
    thresholds:{
        http_req_duration: ['p(90)<3000', 'max<5000'], // 90% das requisições devem ser respondidas em até 10ms e o tempo máximo de resposta deve ser menor que 1s
        http_req_failed: ['rate<0.01'] // A taxa de falhas deve ser menor que 1%

    }
};

export default function () {

    const url = 'http://localhost:3009/login';
    postLogin.username = "junior.lima";
    console.log(postLogin);
    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);
    
    check(response, {
        'Validar que o status é 200': (r) => r.status === 200,
        'Validar que o token é String': (r) => typeof(r.json().token) === 'string'
    })

    sleep(1);
}