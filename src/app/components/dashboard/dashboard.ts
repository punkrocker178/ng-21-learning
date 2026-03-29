import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LeadgenService } from '../../services/leadgen.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  name: string = '';
  email: string = '';

  private readonly leadgenService = inject(LeadgenService);

  onSubmit() {
    console.log(this.name, this.email);
    this.leadgenService.subscribe(this.name, this.email).subscribe((result) => {
      console.log(result);
    });
  }

  onEmailChange(event: Event) {
    console.log((event.target as HTMLInputElement).value);
  }

  onNameChange(event: Event) {
    console.log((event.target as HTMLInputElement).value);
  }
}
