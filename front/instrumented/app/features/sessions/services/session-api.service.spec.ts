import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Session } from '../interfaces/session.interface';

describe('SessionsService', () => {
  let service: SessionApiService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [SessionApiService],
    });
    service = TestBed.inject(SessionApiService); // Récupère une instance du service
    httpMock = TestBed.inject(HttpTestingController); // Récupère le contrôleur HTTP simulé
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête HTTP non résolue n'a été effectuée
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete a session with delete()', () => {
    const sessionId = '1';

    // Appelle la méthode `delete()`
    service.delete(sessionId).subscribe((response) => {
      expect(response).toBeNull(); // Vérifie que la réponse est vide (null)
    });

    // Vérifie qu'une requête DELETE a été envoyée à l'URL correcte
    const req = httpMock.expectOne(`api/session/${sessionId}`);
    expect(req.request.method).toBe('DELETE'); // Vérifie que la méthode est DELETE
    req.flush(null); // Simule une réponse vide
  });

  it('should create a session with create()', () => {
    const mockSession: Session = {
      name: 'New Session',
      description: 'A new session',
      date: new Date(),
      teacher_id: 101,
      users: [],
    };
    // Appelle la méthode `create()`
    service.create(mockSession).subscribe((session) => {
      expect(session).toEqual(mockSession); // Vérifie que les données créées correspondent
    });

    // Vérifie qu'une requête POST a été envoyée à l'URL correcte
    const req = httpMock.expectOne('api/session');
    expect(req.request.method).toBe('POST'); // Vérifie que la méthode est POST
    expect(req.request.body).toEqual(mockSession); // Vérifie que les données envoyées correspondent
    req.flush(mockSession); // Simule une réponse avec la session créée
  });

  it('should update a session with update()', () => {
    const updatedSession: Session = {
      id: 1,
      name: 'Updated Session',
      description: 'An updated session',
      date: new Date(),
      teacher_id: 101,
      users: [1, 2, 3],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    service.update('1', updatedSession).subscribe((session) => {
      expect(session).toEqual(updatedSession); // Vérifie que la session mise à jour correspond
    });

    const req = httpMock.expectOne('api/session/1'); // Vérifie qu'une requête PUT est envoyée à cette URL
    expect(req.request.method).toBe('PUT'); // Vérifie que la méthode HTTP est PUT
    expect(req.request.body).toEqual(updatedSession); // Vérifie que le corps de la requête correspond
    req.flush(updatedSession); // Simule une réponse avec la session mise à jour
  });
});

// npx jest src/app/features/sessions/services/session-api.service.spec.ts --coverage
