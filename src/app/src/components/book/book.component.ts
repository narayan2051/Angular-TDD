import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less'],
})
export class BookComponent implements OnInit {
  checkIn: any;
  checkOut: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    public dialogRef: MatDialogRef<BookComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  calculateTotal(checkIn: any, checkOut: any): any {
    //find the difference betwwen the checkin and out number
    const checkInDate = moment(checkIn, 'yyyy-MM-DD');
    const checkOutDate = moment(checkOut, 'yyy-MM-DD');
    const nights = checkOutDate.diff(checkInDate, 'days');

    return this.data.home.price * nights;
    //multiply the difference by the price
  }

  bookHome(): any {
    return this.dataService.bookHome$().subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open('Home Booked', '', {
        duration: 3000,
      });
    });
  }
}
