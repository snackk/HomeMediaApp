import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsLedPage } from './tabs-led.page';

describe('TabsLedPage', () => {
  let component: TabsLedPage;
  let fixture: ComponentFixture<TabsLedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsLedPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsLedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
