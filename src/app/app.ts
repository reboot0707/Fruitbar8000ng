import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./share/components/header/header";
import { Footer } from "./share/components/footer/footer";

@Component({
  imports: [RouterOutlet, Header, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  // Angular 22 預設使用 OnPush
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class App {
  protected readonly title = signal('Fruitbar8000ng');
}
