import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenModule } from './token/token.module';
import { GasModule } from './gas/gas.module';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [TokenModule, GasModule, BlockchainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
