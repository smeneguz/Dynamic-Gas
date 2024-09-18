import { Component } from '@angular/core';

@Component({
  selector: 'app-swapp-fee-interaction',
  templateUrl: './swapp-fee-interaction.component.html',
  styleUrls: ['./swapp-fee-interaction.component.css']
})
export class SwappFeeInteractionComponent {
  contractAddress = '';
  senderAddress = '';
  selectedCurrency = '';
  maxGasAmount = '';
  currencies = ['ETH', 'BTC', 'ADA']; 
}
