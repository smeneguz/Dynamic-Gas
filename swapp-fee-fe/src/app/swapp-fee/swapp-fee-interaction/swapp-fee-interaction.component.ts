import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importa il modulo HttpClient
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-swapp-fee-interaction',
  templateUrl: './swapp-fee-interaction.component.html',
  styleUrls: ['./swapp-fee-interaction.component.css']
})
export class SwappFeeInteractionComponent {
  contractAddress: string = '';
  senderAddress: string = '';
  selectedCurrency: string = '';
  maxGasAmount: string = '';
  currencies: string[] = ['ETH', 'BTC', 'SOL', 'IOTA'];  // Aggiungi le tue valute

  constructor(private http: HttpClient) {}

  onSubmit() {
    const formData = {
      contractAddress: this.contractAddress,
      senderAddress: this.senderAddress,
      selectedCurrency: this.selectedCurrency,
      maxGasAmount: this.maxGasAmount
    };

    this.http.post('http://localhost:3000/api/submit-fee', formData)  // Sostituisci con la tua API NestJS
      .pipe(
        catchError(error => {
          console.error('Errore durante l\'invio del form:', error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        console.log('Risposta dal server:', response);
      });
  }
}
