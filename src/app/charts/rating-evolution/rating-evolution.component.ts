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
    const labels = this.createIndexes(this.data.length);
    const colors = labels.map(i => this.intToRGB(i));

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: [{
          data: this.data,
          backgroundColor: colors,
          fill: false
        }],
        labels: labels
      },
      options: {
        title: {
          display: true,
          text: ['Evolução das suas notas.'],
        },

        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  max: 1000
              },
              scaleLabel: {
                  display: true,
                  labelString: 'Média da avaliação'
              }
          }]
        }
      }
    });
  };

  private createIndexes(length) {
    return Array(length).fill(undefined).map((_, idx) => idx.toString());
  }

  private intToRGB(value) {
    value = parseInt(value) * 1000 * Math.random();
    
    const blue = Math.floor(value % 256);
    const green = Math.floor(value / 256 % 256);
    const red = Math.floor(value / 256 / 256 % 256);

    return "rgb(" + red + "," + green + "," + blue + ")";
  }

}
