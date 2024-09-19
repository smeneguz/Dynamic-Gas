import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Funzione per elaborare i dati del form
  processFormData(formData: any): any {
    // Estrai i campi dal body
    const { contractAddress, senderAddress, selectedCurrency, maxGasAmount } = formData;

    // Puoi eseguire ulteriori validazioni o calcoli qui
    const processedData = {
      smartContractAddress: contractAddress || 'N/A',  // Usa contractAddress qui
      senderAddress: senderAddress || 'N/A',
      currency: selectedCurrency || 'Unknown',  // Usa selectedCurrency qui
      maxGasAmount: maxGasAmount ? parseFloat(maxGasAmount) : 0,
      timestamp: new Date(),
    };

    return processedData;
  }
}
