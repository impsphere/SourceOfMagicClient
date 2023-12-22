import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailDraftComponent } from './game-detail-draft.component';

describe('GameDetailDraftComponent', () => {
  let component: GameDetailDraftComponent;
  let fixture: ComponentFixture<GameDetailDraftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameDetailDraftComponent]
    });
    fixture = TestBed.createComponent(GameDetailDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
