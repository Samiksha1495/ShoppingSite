import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPageComponent } from '../login-page/login-page.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showFiller = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
toggle(){
  this.showFiller = true?false:true
}

openDialog(): void {
  const dialogRef = this.dialog.open(LoginPageComponent, {
    width: '27rem',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
   
  });
}

openSignUp():void{

  const dialogRef = this.dialog.open(RegisterComponent, {
    width: '27rem',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
   
  });
}
}
