import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { DataService } from '../../services/data.service';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData;
  let dialogService: jasmine.SpyObj<MatDialogRef<BookComponent>>;
  let dataService: jasmine.SpyObj<DataService>;
  let notificationService: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent],
      imports: [FormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
        { provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef) },
        { provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar) },
      ],
    }).compileComponents();
  });

  const el = (selector: any) => {
    return fixture.nativeElement.querySelector(selector);
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dialogData = TestBed.get(MAT_DIALOG_DATA);
    dataService = TestBed.get(DataService);
    dialogService = TestBed.get(MatDialogRef);
    notificationService= TestBed.get(MatSnackBar);
    component = fixture.componentInstance;

    dialogData.home = {
      title: 'Home 1',
      image:
        'https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80',
      location: ' New York',
      price: 200,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //should show title
  it('should show title', () => {
    expect(el('[data-test="title"').textContent).toEqual('Book Home 1');
  });

  //should show price
  it('should show price', () => {
    expect(el('[data-test="price"').textContent).toEqual('$200.00 per night');
  });

  //should show check in date field
  it('should show check in date field', () => {
    expect(el('[data-test="checkin"')).toBeTruthy();
  });

  //should show check out field
  it('should show check out field', () => {
    expect(el('[data-test="checkout"')).toBeTruthy();
  });
  //should show total
  it('should show total', () => {
    const checkIn = el('[data-test="checkin"] input');
    checkIn.value = '2019-12-20';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el('[data-test="checkout"] input');
    checkOut.value = '2019-12-23';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    //assert
    expect(el('[data-test="total"]').textContent).toContain('Total $600.00');
  });

  //it should book home after clicking the book button
  it('should book the home', () => {
    dataService.bookHome$.and.returnValue(of(null));

    const checkIn = el('[data-test="checkin"] input');
    checkIn.value = '12/20/19';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el('[data-test="checkout"] input');
    checkOut.value = '12/23/19';
    checkOut.dispatchEvent(new Event('input'));

    const bookBtn = el('[data-test="book-btn"] button');
    fixture.detectChanges();
    bookBtn.click();

    expect(dataService.bookHome$).toHaveBeenCalled();

    //assert
  });

  it('should Close the dialog and shows the notification after clicking book button', () => {
    dataService.bookHome$.and.returnValue(of(null));

    const checkIn = el('[data-test="checkin"] input');
    checkIn.value = '2019-12-20';
    checkIn.dispatchEvent(new Event('input'));

    const checkOut = el('[data-test="checkout"] input');
    checkOut.value = '2019-12-23';
    checkOut.dispatchEvent(new Event('input'));

    const bookBtn = el('[data-test="book-btn"] button');
    fixture.detectChanges();
    bookBtn.click();

    //assert
    expect(dialogService.close).toHaveBeenCalled();
    expect(notificationService.open).toHaveBeenCalled();
    
  });
});
