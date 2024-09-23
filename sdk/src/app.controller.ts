import { Controller, Get, Post, Body, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrencyConverterService } from './utils/currency-converter.service';
import { AccountService } from './utils/account.service';
import { FixedAccountService } from './utils/fixed-account.service';
import { FixedAccount } from './utils/fixed-account.model';
import { exec } from 'child_process';


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


// Post submit-fee funzionante

 /* @Post('submit-fee')
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
*/

//tentativo per aprire bash
@Post('submit-fee')
submitFee(@Body() formData: any) {
  console.log('Dati ricevuti:', formData);

  const senderAddress = formData.senderAddress; // Assicurati che ci sia un campo per l'indirizzo del mittente
  const destinationAddress = formData.destinationAddress; // Indirizzo di destinazione
  const mintAmount = Number(formData.maxGasAmount); // Converti in numero
  const idObjectToTransfer = formData.idObjectToTransfer; // Nuovo campo per l'ID dell'oggetto da trasferire

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

  // Se tutto è corretto, esegui il comando bash con l'ID dell'oggetto
  const command = `iota client transfer --to ${destinationAddress} --object-id ${idObjectToTransfer} --gas-budget 50000000`;

  // Aggiungi il risultato completo del comando a console e al client
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Errore durante l'esecuzione del comando: ${error.message}`);
      return {
        success: false,
        message: `Errore durante l'esecuzione del comando: ${error.message}`,
        output: error.message // Aggiungi il messaggio di errore nel JSON di risposta
      };
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return {
        success: false,
        message: `Errore durante l'esecuzione del comando: ${stderr}`,
        output: stderr // Aggiungi l'output di errore al JSON di risposta
      };
    }

    console.log(`Risultato del comando: ${stdout}`);
    
    // Invia l'output del comando eseguito nel JSON di risposta
    return {
      success: true,
      message: 'Transazione e comando eseguiti con successo!',
      maxGasAmount: mintAmount,  // MINT
      iotaAmount: iotaAmount,    // IOTA
      transferredObjectId: idObjectToTransfer, // L'ID dell'oggetto trasferito
      output: stdout // Aggiungi l'output del comando al JSON di risposta
    };
  });

  // Ritorna un messaggio di successo immediato (prima che il comando finisca)
  return {
    success: true,
    message: 'Transazione eseguita, attendere il completamento del comando bash.',
    maxGasAmount: mintAmount,  // MINT
    iotaAmount: iotaAmount,    // IOTA
    transferredObjectId: idObjectToTransfer // L'ID dell'oggetto trasferito
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
