import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyConverterService } from './utils/currency-converter.service';
import { AccountService } from './utils/account.service'; // Importa AccountService
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,CurrencyConverterService, AccountService],
})
export class AppModule {}
