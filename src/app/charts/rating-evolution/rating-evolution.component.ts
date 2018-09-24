import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as Chart from 'chart.js';

import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-rating-evolution',
  templateUrl: './rating-evolution.component.html',
  styleUrls: ['./rating-evolution.component.scss']
})
export class RatingEvolutionComponent implements OnInit, OnChanges {
  @Input() userId;
  chart: any;
  data: any;

  constructor(private statsService: StatsService) { }

  ngOnChanges(): void {
    this.getData();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.statsService
    .getUserEvolution(this.userId)
    .subscribe((data: any[]) => {
        this.data = data;
        this.generateChart();
      });
  }

  generateChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Evolução das suas notas',
          data: this.data
        }]
      }
    });
  }

}
