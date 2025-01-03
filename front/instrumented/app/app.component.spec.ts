import { TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AppComponent', () => {
  let fixture;
  let component: AppComponent;
  let sessionServiceMock: { $isLogged: jest.Mock, logOut: jest.Mock };
  let routerMock: { navigate: jest.Mock };

  beforeEach(async () => {
    sessionServiceMock = {
      $isLogged: jest.fn(() => of(true)), // Simule un utilisateur connecté
      logOut: jest.fn(),
    };
    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy(); // Vérifie que le composant est créé
  });


  it('should call sessionService.logOut and navigate on logout', () => {
    component.logout(); // Appelle la méthode logout

    // Vérifie que logOut a été appelé
    expect(sessionServiceMock.logOut).toHaveBeenCalled();

    // Vérifie que la navigation a été effectuée vers la page d'accueil
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
  });
});
