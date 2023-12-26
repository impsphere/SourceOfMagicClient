import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailScoreComponent } from './game-detail-score.component';

describe('GameDetailScoreComponent', () => {
  let component: GameDetailScoreComponent;
  let fixture: ComponentFixture<GameDetailScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameDetailScoreComponent]
    });
    fixture = TestBed.createComponent(GameDetailScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
