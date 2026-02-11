import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScaleBuilder } from './scale-builder/scale-builder';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ScaleBuilder],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('scale-share');
}
