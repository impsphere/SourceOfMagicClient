import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NFLPlayersComponent } from './nflplayers.component';

describe('NFLPlayersComponent', () => {
  let component: NFLPlayersComponent;
  let fixture: ComponentFixture<NFLPlayersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NFLPlayersComponent]
    });
    fixture = TestBed.createComponent(NFLPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
