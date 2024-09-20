import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrencyConverterService } from './utils/currency-converter.service';
import { AccountService } from './utils/account.service';

@Controller('api') // Definisce il percorso base per tutti i metodi del controller
export class AppController {
  // Inietti sia AppService che CurrencyConverterService nel costruttore
  constructor(
    private readonly appService: AppService,
    private readonly currencyConverterService: CurrencyConverterService, // Aggiungi il servizio di conversione
    private readonly accountService: AccountService
  ) {}

  @Get('test') // Endpoint GET per verificare che il server stia rispondendo
  getTest(): string {
    return 'Server is working!';
  }

  @Post('submit-fee') // Endpoint POST per gestire i dati del form
  submitFee(@Body() formData: any) {
    console.log('Dati ricevuti:', formData);

    // Converti il maxGasAmount da MINT a IOTA
    const mintAmount = Number(formData.maxGasAmount); // Assicurati che sia un numero
    const iotaAmount = this.currencyConverterService.convertMintToIota(mintAmount);

    return {
      message: 'Dati ricevuti con successo',
      maxGasAmount: mintAmount,  // MINT
      iotaAmount: iotaAmount  // IOTA
    };
  }

  // Endpoint POST per aggiungere un account
  @Post('add-account')
  addAccount(
    @Body('alias') alias: string,
    @Body('address') address: string,
    @Body('balance') balance: number,
  ) {
    console.log(`Aggiungendo account: Alias: ${alias}, Address: ${address}, Balance: ${balance}`);
    return this.accountService.addAccount(alias, address, balance);
  }

  // Endpoint GET per ottenere tutti gli account
  @Get('accounts')
  getAccounts() {
    return this.accountService.getAccounts();
  }

  // Endpoint GET per ottenere un account tramite alias
  @Get('account')
  getAccountByAlias(@Query('alias') alias: string) {
    return this.accountService.getAccountByAlias(alias);
  }
}
