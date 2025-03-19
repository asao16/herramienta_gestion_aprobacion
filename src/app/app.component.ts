import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatButton, MatMenu, MatMenuItem, MatMenuTrigger, MatIconModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'gestionAprobacionProductos';


}
