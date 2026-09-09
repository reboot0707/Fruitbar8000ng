import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./share/components/header/header";
import { Footer } from "./share/components/footer/footer";

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Fruitbar8000ng');
}
