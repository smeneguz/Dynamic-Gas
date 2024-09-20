import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyConverterService } from './utils/currency-converter.service';
import { AccountService } from './utils/account.service'; // Importa AccountService
import { FixedAccountService } from './utils/fixed-account.service';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,CurrencyConverterService, AccountService, FixedAccountService],
})
export class AppModule {}
