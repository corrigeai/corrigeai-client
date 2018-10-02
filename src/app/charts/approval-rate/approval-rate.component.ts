import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as Chart from 'chart.js';

import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-approval-rate',
  templateUrl: './approval-rate.component.html',
  styleUrls: ['./approval-rate.component.scss']
})
export class ApprovalRateComponent implements OnInit, OnChanges {
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
    .getApprovalRate(this.userId)
    .subscribe((data: any[]) => {
        this.data = data;
        this.generateChart();
      });
  }

  generateChart() {
    const labels = Object.keys(this.data);
    let values: number[] = Object.values(this.data);
    const amount = values[0] + values[1];
    values = values.map(v => (v / amount) * 100);

    const colors = this.createIndexes(labels.length).map(i => this.intToRGB(i));

    this.chart = new Chart('aproval-rate', {
      type: 'bar',
      data: {
        datasets: [{
          data: values,
          backgroundColor: colors,
          fill: false
        }],
        labels: labels
      },
      options: {
        title: {
          display: true,
          text: ['Taxa de aprovação de suas avaliações.'],
        },

        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              },
              scaleLabel: {
                  display: true,
                  labelString: '%'
              }
          }]
        }
      }
    });
  }

  private createIndexes(length) {
    return Array(length).fill(undefined).map((_, idx) => idx.toString());
  }

  private intToRGB(value) {
    value = parseInt(value) * 1000 * Math.random();

    const blue = Math.floor(value % 256);
    const green = Math.floor(value / 256 % 256);
    const red = Math.floor(value / 256 / 256 % 256);

    return 'rgb(' + red + ',' + green + ',' + blue + ')';
  }

}
