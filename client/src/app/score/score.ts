import { Component, inject } from '@angular/core';
import { ScoreRendererService } from '../_services/score-renderer.service';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.html',
  styleUrl: './score.scss',
})
export class Score {
  renderer: ScoreRendererService = inject(ScoreRendererService);

}
