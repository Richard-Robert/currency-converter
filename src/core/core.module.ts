import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent]
})
export class CoreModule {}
