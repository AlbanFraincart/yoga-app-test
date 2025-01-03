import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Nécessaire pour tester les requêtes HTTP
import { AuthService } from './auth.service';
import { RegisterRequest } from '../interfaces/registerRequest.interface';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';

describe('AuthService', () => {
    let service: AuthService; // Instance du service à tester
    let httpTestingController: HttpTestingController; // Contrôle les requêtes HTTP simulées

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,], // Module pour tester les requêtes HTTP
            providers: [AuthService], // Fournit le service à tester
        });

        service = TestBed.inject(AuthService); // Récupère une instance du service
        httpTestingController = TestBed.inject(HttpTestingController); // Récupère le contrôleur HTTP simulé
    });

    afterEach(() => {
        httpTestingController.verify(); // Vérifie qu'aucune requête HTTP inattendue n'a été faite
    });

    it('should be created', () => {
        expect(service).toBeTruthy(); // Vérifie que le service est créé
    });

    it('should send a POST request to register a user', () => {
        const mockRequest: RegisterRequest = {
            email: 'test@test.com',
            firstName: 'testname',
            lastName: 'testlastname',
            password: 'testpassword',
        };

        // Appel de la méthode `register` et abonnement pour capturer la réponse
        service.register(mockRequest).subscribe((response) => {
            expect(response).toBeUndefined(); // Vérifie que la méthode retourne bien `undefined` (Observable<void>)
        });

        // Vérifie qu'une requête HTTP a été envoyée à `api/auth/register`
        const req = httpTestingController.expectOne('api/auth/register');

        expect(req.request.method).toBe('POST');

        // Vérifie que les données envoyées dans le corps de la requête sont correctes
        expect(req.request.body).toEqual(mockRequest);

        // Simule une réponse du serveur avec une réponse vide (null pour un Observable<void>)
        req.flush(null);
    });

    it('should send a POST request to log in a user', () => {
        const mockRequest: LoginRequest = {
            email: 'test@example.com',
            password: 'password123',
        };

        const mockResponse: SessionInformation = {
            token: 'fake-token',
            type: 'Bearer',
            id: 1,
            username: 'testuser',
            firstName: 'Test',
            lastName: 'User',
            admin: true,
        };

        service.login(mockRequest).subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpTestingController.expectOne('api/auth/login');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockRequest);
        req.flush(mockResponse);
    });
});
// npx jest src/app/features/auth/services/auth.service.spec.ts --coverage