import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesComponent } from './homes.component';

import { spyOnClass } from 'jasmine-es6-spies';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';
import { DialogService } from '../../services/dialog.service';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogServie: jasmine.SpyObj<DialogService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomesComponent],
      providers: [
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
        { provide: DialogService, useFactory: () => spyOnClass(DialogService) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    dialogServie= TestBed.get(DialogService);
    dataService.getHomes$.and.returnValue(
      of([
        {
          title: 'Home 1',
          image:
            'https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
          location: ' New York',
        },
        {
          title: 'Home 2',
          image:
            'https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
          location: ' Bostan',
        },
        {
          title: 'Home 3',
          image:
            'https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
          location: 'Chicago',
        },
      ])
    );
    fixture.detectChanges();
  });

  it('should show homes', () => {
    expect(
      fixture.nativeElement.querySelectorAll('[data-test="home"]').length
    ).toBe(3);
  });

  it('should show home info', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"');
    expect(home.querySelector('[data-test="title"]').innerText).toEqual(
      'Home 1'
    );
    expect(home.querySelector('[data-test="location"]').innerText).toEqual(
      'New York'
    );
    expect(home.querySelector('[data-test="image"]')).toBeTruthy();
  });
  it('should show Book button', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');
    expect(home.querySelector('[data-test="book-button"]')).toBeTruthy();
  });

  it('should use dialog service to open a dialog when clicking book button', () => {
    //grab the button to click
    const bookBtn = fixture.nativeElement.querySelector('[data-test="book-button"] button');
    //click the button
    bookBtn.click();
    //assert that the dialog service was used to open the dialog
    expect(dialogServie.open).toHaveBeenCalled();
  });
});
