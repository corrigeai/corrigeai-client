import { Component, OnInit, Input } from '@angular/core';
import { PayPalConfig, PayPalIntegrationType, PayPalEnvironment } from 'ngx-paypal';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: PayPalConfig;

  @Input('value') value: number;

  constructor() { }

  ngOnInit() {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: environment.paypalClientID,
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('Payment Complete');
        //TODO: create registry on sever.
      },
      onCancel: (data, actions) => {
        console.log('Operation canceled');
      },
      onError: (err) => {
        console.log('err');
      },
      transactions: [{
        amount: {
          currency: 'BRL',
          total: this.value
        }
      }]
    });
  }

}
