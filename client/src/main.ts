import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
    .catch((err) => console.error(err));


const loggedOutDataResponse = await fetch("http://localhost:5155/data");

console.log(loggedOutDataResponse);

const registerResponse = await fetch("http://localhost:5155/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "jello",
        email: "jello@hotmail.com",
        password: "Str1ng!"
    })
});

console.log(registerResponse);

const loginResponse = await fetch("http://localhost:5155/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "jello",
        password: "Str1ng!"
    }),
    credentials: "include"
});

console.log(loginResponse);

const loggedInDataResponse = await fetch("http://localhost:5155/data", {
    method: "GET",
    credentials: "include"
});

console.log(await loggedInDataResponse.json());