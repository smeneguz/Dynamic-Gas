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
  senderAddress: string = ''; // Indirizzo del mittente
  sponsorAddress: string = ''; // Indirizzo dello sponsor
  destinationAddress: string = ''; // Indirizzo di destinazione
  selectedCurrency: string = 'MINT'; // Valuta predefinita
  maxGasAmount: string = ''; // Quantità massima di gas in MINT
  idObjectToTransfer: string = ''; // ID dell'oggetto da trasferire
  currencies: string[] = ['MINT']; // Array con un'unica valuta

  transactionSuccess: boolean = false; // Stato della transazione
  gasAmount: number = 0; // Quantità di gas pagato
  iotaAmount: number = 0; // Quantità convertita in IOTA
  errorMessage: string = ''; // Messaggio di errore
  isSubmitting: boolean = false; // Stato per gestire l'invio del form

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Evita l'invio multiplo durante la richiesta
    if (this.isSubmitting) return;

    // Imposta lo stato a "in invio"
    this.isSubmitting = true;

    const formData = {
      senderAddress: this.senderAddress,
      sponsorAddress: this.sponsorAddress, // Aggiunge il campo sponsorAddress
      destinationAddress: this.destinationAddress,
      selectedCurrency: this.selectedCurrency,
      maxGasAmount: this.maxGasAmount,
      idObjectToTransfer: this.idObjectToTransfer // Aggiunge il nuovo campo idObjectToTransfer
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
        this.iotaAmount = response.iotaAmount; // Mostra l'importo convertito in IOTA
        this.errorMessage = ''; // Resetta eventuali messaggi di errore
        this.isSubmitting = false; // Permette di inviare di nuovo il form
      });
  }
}
