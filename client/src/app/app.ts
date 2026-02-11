import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TonicSelector } from "./tonic-selector/tonic-selector";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TonicSelector],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('scale-share');
}
