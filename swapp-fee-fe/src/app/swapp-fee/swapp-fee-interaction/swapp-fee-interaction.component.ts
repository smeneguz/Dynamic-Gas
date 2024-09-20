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
  iotaAmount: number = 0; // Quantità convertita in IOTA
  errorMessage: string = ''; // Variabile per il messaggio di errore

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
          this.errorMessage = 'Errore durante la transazione: ' + (error.error?.message || 'Si è verificato un problema');
          this.transactionSuccess = false; // Impedisce di mostrare il successo in caso di errore
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        console.log('Risposta dal server:', response);
        this.transactionSuccess = true; // Mostra il messaggio di successo
        this.gasAmount = response.maxGasAmount; // Mostra il gas pagato
        this.iotaAmount = response.iotaAmount;
        this.errorMessage = ''; // Resetta eventuali messaggi di errore
       });
  }
}
