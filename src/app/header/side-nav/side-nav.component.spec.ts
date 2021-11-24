import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closes sidenav on logout', () => {
    const closeNavSpy = spyOn(component, 'onSidenavClose');
    component.onLogout();
    expect(closeNavSpy).toHaveBeenCalled();
  });

  it('emits closing event', () => {
    const emitSpy = spyOn(component.sidenavClose, 'emit');
    component.onSidenavClose();
    expect(emitSpy).toHaveBeenCalled();
  })
});
