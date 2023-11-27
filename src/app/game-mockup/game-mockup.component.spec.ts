import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMockupComponent } from './game-mockup.component';

describe('GameMockupComponent', () => {
  let component: GameMockupComponent;
  let fixture: ComponentFixture<GameMockupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameMockupComponent]
    });
    fixture = TestBed.createComponent(GameMockupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
