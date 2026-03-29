import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LeadgenService } from '../../services/leadgen.service';

@Component({
  selector: 'app-contact-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  name: string = '';
  email: string = '';
  message: string = '';

  private readonly leadgenService = inject(LeadgenService);

  onSubmit() {
    const payload = { name: this.name, email: this.email, message: this.message };
    this.leadgenService.subscribe(payload).subscribe((result) => {
      console.log(result);
    });
  }
}
