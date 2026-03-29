import { Component } from '@angular/core';
import { ContactForm } from '../contact-form/contact-form';

@Component({
  selector: 'app-dashboard',
  imports: [ContactForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
