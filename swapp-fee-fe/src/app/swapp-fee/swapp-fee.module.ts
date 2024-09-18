import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { SwappFeeInteractionComponent } from './swapp-fee-interaction/swapp-fee-interaction.component';

@NgModule({
  declarations: [
    SwappFeeInteractionComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Aggiungi FormsModule qui
  ],
  exports: [
    SwappFeeInteractionComponent
  ]
})
export class SwappFeeModule { }
