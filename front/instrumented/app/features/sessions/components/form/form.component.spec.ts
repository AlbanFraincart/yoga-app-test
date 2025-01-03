import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  const mockRouter = {
    navigate: jest.fn(), // Simule la méthode de navigation
    url: '/sessions/update/1', // Simule une URL contenant "update"
  };

  const mockActivatedRoute = {
    snapshot: { paramMap: { get: jest.fn(() => '1') } }, // Simule un ID de session
  };

  const mockSessionApiService = {
    detail: jest.fn(() => of({ name: 'Test', date: new Date(), teacher_id: 1, description: 'Test description' })), // Simule une session existante
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SessionApiService, useValue: mockSessionApiService },
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should redirect if user is not admin (simple test)', () => {
    mockSessionService.sessionInformation.admin = false; // Simule un utilisateur non admin
    component.ngOnInit(); // Appelle la méthode `ngOnInit`
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sessions']); // Vérifie la redirection
  });

  it('should load session data for update if URL contains "update" (slightly complex test)', () => {
    component.ngOnInit(); // Appelle la méthode `ngOnInit` avec une URL contenant "update"
    expect(component.onUpdate).toBe(true); // Vérifie que `onUpdate` est activé
    expect(mockSessionApiService.detail).toHaveBeenCalledWith('1'); // Vérifie l'appel au service `detail`
  });
});
