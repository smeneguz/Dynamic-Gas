import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwappFeeModule } from './swapp-fee/swapp-fee.module'; // Importa il nuovo modulo

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwappFeeModule // Aggiungi SwappFeeModule qui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
