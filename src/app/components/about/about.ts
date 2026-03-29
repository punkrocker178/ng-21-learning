import { Component } from '@angular/core';
import { ContactForm } from '../contact-form/contact-form';

@Component({
  selector: 'app-about',
  imports: [ContactForm],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
