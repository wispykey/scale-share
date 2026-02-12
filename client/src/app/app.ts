import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScaleBuilder } from './scale-builder/scale-builder';
import { Score } from "./score/score";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ScaleBuilder, Score],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('scale-share');
}
