import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // Definisce il percorso base per tutti i metodi del controller
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test') // Endpoint GET per verificare che il server stia rispondendo
  getTest(): string {
    return 'Server is working!';
  }

  @Post('submit-fee') // Endpoint POST per gestire i dati del form
  submitFee(@Body() formData: any) {
    console.log('Dati ricevuti:', formData);
    // Logica per processare i dati inviati
    return { message: 'Dati ricevuti con successo' };
  }
}
