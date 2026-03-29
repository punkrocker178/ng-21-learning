import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactForm } from './contact-form';
import { LeadgenService } from '../../services/leadgen.service';
import { type Mocked } from 'vitest';
import { of } from 'rxjs';

const spyLeadgenService: Mocked<Pick<LeadgenService, 'subscribe'>> = {
  subscribe: vi.fn(),
};
describe('ContactForm', () => {
  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;

  beforeEach(async () => {
    spyLeadgenService.subscribe.mockReturnValue(of(true));
    await TestBed.configureTestingModule({
      imports: [ContactForm],
      providers: [
        { provide: LeadgenService, useValue: spyLeadgenService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call leadgenService.subscribe when onSubmit is called', () => {
    const mockName = 'test';
    const mockEmail = 'test';
    const mockMessage = 'test';
    component.name = mockName;
    component.message = mockMessage;
    component.email = mockEmail;
    component.onSubmit();
    expect(spyLeadgenService.subscribe).toHaveBeenCalledWith({ name: mockName, email: mockEmail, message: mockMessage });
  });
});
