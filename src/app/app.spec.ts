import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const links = Array.from(fixture.nativeElement.querySelectorAll('nav a')).map((a) => (a as HTMLElement).textContent?.trim());
    expect(links).toEqual(['Task-Manager-App', 'Create', 'View All', 'Update', 'Delete']);
  });
});
