import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyConverterService } from './utils/currency-converter.service';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,CurrencyConverterService],
})
export class AppModule {}
