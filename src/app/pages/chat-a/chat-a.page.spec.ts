import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAPage } from './chat-a.page';

describe('ChatAPage', () => {
  let component: ChatAPage;
  let fixture: ComponentFixture<ChatAPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
