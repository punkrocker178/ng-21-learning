import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { LeadgenService } from '../../services/leadgen.service';
import { type Mocked } from 'vitest';
import { of } from 'rxjs';


const spyLeadgenService: Mocked<Pick<LeadgenService, 'subscribe'>> = {
  subscribe: vi.fn(),
};

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  beforeEach(async () => {

    spyLeadgenService.subscribe.mockReturnValue(of(true));
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        { provide: LeadgenService, useValue: spyLeadgenService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call leadgenService.subscribe when onSubmit is called', () => {
    const mockName = 'test';
    const mockEmail = 'test';
    component.name = mockName;
    component.email = mockEmail;
    component.onSubmit();
    expect(spyLeadgenService.subscribe).toHaveBeenCalledWith(mockName, mockEmail);
  });
});
