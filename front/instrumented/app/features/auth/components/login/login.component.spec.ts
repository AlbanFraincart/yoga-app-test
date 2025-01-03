// Import des modules nécessaires pour les tests
import { HttpClientModule } from '@angular/common/http'; // Nécessaire pour les services utilisant HttpClient
import { ComponentFixture, TestBed } from '@angular/core/testing'; // Utilisé pour configurer et tester les composants Angular
import { ReactiveFormsModule } from '@angular/forms'; // Nécessaire pour les formulaires réactifs
import { MatCardModule } from '@angular/material/card'; // Module Angular Material pour les cartes
import { MatFormFieldModule } from '@angular/material/form-field'; // Module Angular Material pour les champs de formulaire
import { MatIconModule } from '@angular/material/icon'; // Module Angular Material pour les icônes
import { MatInputModule } from '@angular/material/input'; // Module Angular Material pour les champs de saisie
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Nécessaire pour les animations Angular Material
import { RouterTestingModule } from '@angular/router/testing'; // Fournit un environnement simulé pour les tests de navigation
import { expect } from '@jest/globals'; // Méthodes de test de Jest
import { SessionService } from 'src/app/services/session.service'; // Service de session utilisé dans les tests

import { LoginComponent } from './login.component'; // Composant à tester
import { AuthService } from '../../services/auth.service'; // Service d'authentification utilisé dans les tests
import { Router } from '@angular/router'; // Utilisé pour la navigation dans Angular
import { of, throwError } from 'rxjs'; // Utilitaires RxJS pour simuler des réponses dans les tests
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface'; // Interface décrivant les données de session


describe('LoginComponent', () => {
  let component: LoginComponent; // Instance du composant à tester
  let fixture: ComponentFixture<LoginComponent>; // Fixture pour accéder au DOM et interagir avec le composant

  // Mocks avec Jest
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock: jest.Mocked<Router>;
  let sessionServiceMock: jest.Mocked<SessionService>;

  beforeEach(async () => {

    // Initialisation des mocks avec Jest
    authServiceMock = {
      login: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    sessionServiceMock = {
      logIn: jest.fn(),
    } as unknown as jest.Mocked<SessionService>;

    await TestBed.configureTestingModule({ // Configuration du module de test, testBed joue le rôle d'un environnement de test
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock },
      { provide: Router, useValue: routerMock },
      { provide: SessionService, useValue: sessionServiceMock },],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent); // Crée une instance du composant
    component = fixture.componentInstance; // Récupère l'instance du composant
    fixture.detectChanges(); // Déclenche la détection des changements pour initialiser le composant
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Vérifie que le composant est créé.
  });

  it('should initialize the form with empty values', () => {
    const form = component.form; // Récupère le formulaire.
    expect(form.value).toEqual({ email: '', password: '' }); // Vérifie que les champs sont vides.
    expect(form.valid).toBe(false); // Vérifie que le formulaire est invalide.
  });

  it('should validate the email field', () => {
    const emailControl = component.form.get('email'); // Récupère le champ email.

    emailControl?.setValue(''); // Définit une valeur vide.
    expect(emailControl?.valid).toBe(false); // Vérifie que le champ est invalide.

    emailControl?.setValue('invalid-email'); // Définit un email incorrect.
    expect(emailControl?.valid).toBe(false); // Toujours invalide.

    emailControl?.setValue('test@example.com'); // Définit un email valide.
    expect(emailControl?.valid).toBe(true); // Valide.
  });

  it('should disable the submit button if the form is invalid', () => {
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    component.form.setValue({ email: '', password: '' }); // Formulaire invalide.
    fixture.detectChanges();
    expect(button.disabled).toBe(true); // Vérifie que le bouton est désactivé.

    component.form.setValue({ email: 'test@example.com', password: 'password123' }); // Formulaire valide.
    fixture.detectChanges();
    expect(button.disabled).toBe(false); // Vérifie que le bouton est activé.
  });

  it('should call AuthService.login and navigate on success', () => {
    const mockResponse: SessionInformation = {
      token: 'fake-token',
      type: 'Bearer', // Exemple de type, peut être adapté à votre logique
      id: 1,
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      admin: true, // Exemple de valeur pour le rôle admin
    };
    authServiceMock.login.mockReturnValue(of(mockResponse)); // Mock d'une réponse réussie.

    component.form.setValue({ email: 'test@example.com', password: 'password123' });
    component.submit(); // Soumission du formulaire.

    expect(authServiceMock.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(sessionServiceMock.logIn).toHaveBeenCalledWith(mockResponse);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/sessions']);
  });

  it('should set onError to true on login error', () => {
    authServiceMock.login.mockReturnValue(throwError(() => new Error('Login failed'))); // Simule une erreur.

    component.form.setValue({ email: 'test@example.com', password: 'password123' });
    component.submit(); // Soumission.

    expect(component.onError).toBe(true); // Vérifie que `onError` est activé.
  });
});


// npx jest src/app/features/auth/components/login/login.component.spec.ts    // run this test file