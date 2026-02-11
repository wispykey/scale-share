import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TonicSelector } from "./tonic-selector/tonic-selector";
import { ScaleSelector } from "./scale-selector/scale-selector";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TonicSelector, ScaleSelector],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('scale-share');
}
