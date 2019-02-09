import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
public bodyColor:boolean;
loginForm = new FormGroup({
  username: new FormControl(''),
  password: new FormControl(''),
});
  // loginForm = this.fb.group({
  //   username: [''],
  //   password: ['']
  // });
  
  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<LoginPageComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    this.bodyColor=true;
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
