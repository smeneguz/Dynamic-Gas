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

  idObjectToTransfer: string = ''; // Nuovo campo per l'ID dell'oggetto da trasferire
  transactionSuccess: boolean = false; // Stato per la transazione
  gasAmount: number = 0; // Quantità di gas pagato
  iotaAmount: number = 0; // Quantità convertita in IOTA
  errorMessage: string = ''; // Variabile per il messaggio di errore
  isSubmitting: boolean = false; // Stato per gestire l'invio del form

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.isSubmitting) return; // Impedisce l'invio multiplo durante la richiesta

    this.isSubmitting = true; // Imposta lo stato a "in invio"

    const formData = {
      senderAddress: this.senderAddress,
      destinationAddress: this.destinationAddress,
      selectedCurrency: this.selectedCurrency,
      maxGasAmount: this.maxGasAmount,
      idObjectToTransfer: this.idObjectToTransfer // Aggiunge il nuovo campo
    };

    // Simulazione del comando di trasferimento
    const command = `iota client transfer --to ${this.destinationAddress} --object-id ${this.idObjectToTransfer} --gas-budget ${this.maxGasAmount}`;
    console.log('Comando di trasferimento:', command);

    this.http.post('http://localhost:3000/api/submit-fee', formData)
      .pipe(
        catchError(error => {
          console.error('Errore durante l\'invio del form:', error);
          this.errorMessage = 'Errore durante la transazione: ' + (error.error?.message || 'Si è verificato un problema');
          this.transactionSuccess = false; // Impedisce di mostrare il successo in caso di errore
          this.isSubmitting = false; // Rende possibile un nuovo submit
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        console.log('Risposta dal server:', response);
        this.transactionSuccess = true; // Mostra il messaggio di successo
        this.gasAmount = response.maxGasAmount; // Mostra il gas pagato
        this.iotaAmount = response.iotaAmount;
        this.errorMessage = ''; // Resetta eventuali messaggi di errore
        this.isSubmitting = false; // Permette di inviare di nuovo il form
      });
  }
}
