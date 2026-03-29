import http from 'k6/http';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export function obterToken() {
    const url = 'http://localhost:3009/login';
    const payload = JSON.stringify(postLogin);
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = http.post(url, payload, params);
    return response.json('token');
}