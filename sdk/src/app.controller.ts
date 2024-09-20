import { Controller, Get, Post, Body, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrencyConverterService } from './utils/currency-converter.service';
import { AccountService } from './utils/account.service';
import { FixedAccountService } from './utils/fixed-account.service';
import { FixedAccount } from './utils/fixed-account.model';

@Controller('api') // Definisce il percorso base per tutti i metodi del controller
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly currencyConverterService: CurrencyConverterService,
    private readonly accountService: AccountService,
    private readonly fixedAccountService: FixedAccountService // Aggiungi il servizio degli account fissi
  ) {}

  @Get('test') // Endpoint GET per verificare che il server stia rispondendo
  getTest(): string {
    return 'Server is working!';
  }

  @Post('submit-fee')
  submitFee(@Body() formData: any) {
    console.log('Dati ricevuti:', formData);
  
    const senderAddress = formData.senderAddress; // Assicurati che ci sia un campo per l'indirizzo del mittente
    const mintAmount = Number(formData.maxGasAmount); // Converti in numero
  
    // Recupera gli account fissi
    const fixedAccounts: FixedAccount[] = this.fixedAccountService.getFixedAccounts();
    
    // Trova l'account corrispondente all'indirizzo del mittente
    const senderAccount = fixedAccounts.find(account => account.address === senderAddress);
    
    // Controllo se l'account esiste
    if (!senderAccount) {
      return {
        success: false,
        message: 'L\'indirizzo del mittente non esiste nei fixed accounts.'
      };
    }
  
    // Controlla se il maxGasAmount è minore o uguale al mintBalance
    if (mintAmount > senderAccount.mintBalance) {
      return {
        success: false,
        message: 'Il maxGasAmount specificato è maggiore del balance disponibile nell\'account.'
      };
    }
  
    // Converti il maxGasAmount da MINT a IOTA
    const iotaAmount = this.currencyConverterService.convertMintToIota(mintAmount);
  
    return {
      success: true,
      message: 'Dati ricevuti con successo',
      maxGasAmount: mintAmount,  // MINT
      iotaAmount: iotaAmount,     // IOTA
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

  // Endpoint GET per ottenere gli account fissi
  @Get('fixed-accounts')
  getFixedAccounts() {
    return this.fixedAccountService.getFixedAccounts(); // Usa il servizio degli account fissi
  }
}
