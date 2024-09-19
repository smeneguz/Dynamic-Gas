import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-swapp-fee-interaction',
  templateUrl: './swapp-fee-interaction.component.html',
  styleUrls: ['./swapp-fee-interaction.component.css']
})
export class SwappFeeInteractionComponent {
  senderAddress: string = '';
  destinationAddress: string = '';
  selectedCurrency: string = 'MINT'; // Imposta un valore predefinito
  maxGasAmount: string = '';
  currencies: string[] = ['MINT']; // Array con un'unica valuta

  transactionSuccess: boolean = false; // Stato per la transazione
  gasAmount: number = 0; // Quantità di gas pagato

  constructor(private http: HttpClient) {}

  onSubmit() {
    const formData = {
      senderAddress: this.senderAddress,
      destinationAddress: this.destinationAddress,
      selectedCurrency: this.selectedCurrency,
      maxGasAmount: this.maxGasAmount
    };

    this.http.post('http://localhost:3000/api/submit-fee', formData)
      .pipe(
        catchError(error => {
          console.error('Errore durante l\'invio del form:', error);
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        console.log('Risposta dal server:', response);
        this.transactionSuccess = true; // Mostra il messaggio di successo
        this.gasAmount = response.gasAmount; // Mostra il gas pagato
      });
  }
}
