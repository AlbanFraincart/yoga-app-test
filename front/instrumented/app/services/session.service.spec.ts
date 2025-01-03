import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', () => {
    // Vérifie que les valeurs par défaut sont correctes
    expect(service.isLogged).toBe(false); // `isLogged` doit être initialisé à `false`
    expect(service.sessionInformation).toBeUndefined(); // `sessionInformation` doit être undefined au départ
  });

  it('should update isLogged and sessionInformation on logIn', () => {
    // Objet simulé pour l'utilisateur
    const mockUser: SessionInformation = {
      token: 'fake-token',
      type: 'Bearer',
      id: 1,
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      admin: true,
    };

    // Appelle la méthode `logIn` avec l'utilisateur simulé
    service.logIn(mockUser);

    // Vérifie que l'utilisateur est connecté
    expect(service.isLogged).toBe(true);
    // Vérifie que `sessionInformation` est mis à jour correctement
    expect(service.sessionInformation).toEqual(mockUser);
  });



  it('should reset isLogged and sessionInformation on logOut', () => {
    // Appelle la méthode `logOut`
    service.logOut();

    // Vérifie que l'utilisateur est déconnecté
    expect(service.isLogged).toBe(false);
    // Vérifie que `sessionInformation` est réinitialisé à `undefined`
    expect(service.sessionInformation).toBeUndefined();
  });

});


// npx jest src/app/services/session.service.spec.ts --coverage
