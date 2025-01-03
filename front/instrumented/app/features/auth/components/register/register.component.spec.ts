import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: { register: jest.Mock };
  let routerMock: { navigate: jest.Mock };

  beforeEach(async () => {
    authServiceMock = { register: jest.fn() };
    routerMock = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }, // Utilisation du mock pour AuthService
        { provide: Router, useValue: routerMock }, // Utilisation du mock pour le routeur
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    // Vérifie l'initialisation du formulaire avec des valeurs vides
    const form = component.form;
    expect(form.value).toEqual({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    });
    expect(form.valid).toBe(false);
  });


  it('should validate the email field', () => {
    // Vérifie les validations pour le champ `email`
    const emailControl = component.form.get('email');

    emailControl?.setValue('');
    expect(emailControl?.valid).toBe(false); // Champ vide, invalide

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBe(false); // Email incorrect, invalide

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBe(true); // Email correct, valide
  });


  it('should disable the submit button if the form is invalid', () => {
    // Vérifie que le bouton de soumission est désactivé si le formulaire est invalide
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    component.form.setValue({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    });
    fixture.detectChanges();
    expect(button.disabled).toBe(true);

    component.form.setValue({
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'password123',
    });
    fixture.detectChanges();
    expect(button.disabled).toBe(false);
  });



  it('should call AuthService.register and navigate on success', () => {
    // Teste le succès de la soumission du formulaire
    const mockRequest: RegisterRequest = {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'password123',
    };

    authServiceMock.register.mockReturnValue(of(undefined)); // Simule une réponse réussie du service

    component.form.setValue(mockRequest);
    component.submit();

    // Vérifie que `register` a été appelé avec les bonnes données
    expect(authServiceMock.register).toHaveBeenCalledWith(mockRequest);
    // Vérifie que la redirection a bien eu lieu
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });


  it('should set onError to true on registration error', () => {
    // Teste le comportement en cas d'erreur lors de la soumission
    authServiceMock.register.mockReturnValue(throwError(() => new Error('Registration failed')));

    component.form.setValue({
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'password123',
    });
    component.submit();

    expect(component.onError).toBe(true);
  });
});


// npx jest src/app/features/auth/components/register/register.component.spec.ts --coverage
