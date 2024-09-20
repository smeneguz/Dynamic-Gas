import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrencyConverterService } from './utils/currency-converter.service';

@Controller('api') // Definisce il percorso base per tutti i metodi del controller
export class AppController {
  // Inietti sia AppService che CurrencyConverterService nel costruttore
  constructor(
    private readonly appService: AppService,
    private readonly currencyConverterService: CurrencyConverterService, // Aggiungi il servizio di conversione
  ) {}

  @Get('test') // Endpoint GET per verificare che il server stia rispondendo
  getTest(): string {
    return 'Server is working!';
  }

  @Post('submit-fee') // Endpoint POST per gestire i dati del form
  submitFee(@Body() formData: any) {
    console.log('Dati ricevuti:', formData);

   // Converti il maxGasAmount da MINT a IOTA
   const mintAmount = formData.maxGasAmount;
   const iotaAmount = this.currencyConverterService.convertMintToIota(mintAmount);

   return {
     message: 'Dati ricevuti con successo',
     maxGasAmount: mintAmount,  // MINT
     iotaAmount: iotaAmount  // IOTA
   };
  }
}
