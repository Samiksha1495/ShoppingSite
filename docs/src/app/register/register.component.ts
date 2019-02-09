import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginPageComponent } from '../login-page/login-page.component';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    console.log(control)
      return control.parent.invalid && control.touched;
  }
}

export class CustomValidators {
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    
      const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
      const isValid =(
        formGroup.get("password").value === formGroup.get("confirmPassword").value)?true:false;
      return isValid ? null : { childrenNotEqual: true };
  }
}
export const errorMessages: { [key: string]: string } = {
  name: 'Full name must be between 1 and 128 characters',
  email: 'Email must be a valid email address (username@domain)',
  password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
  confirmPassword: 'Passwords must match',
  mobile:"Enter a valid mobile number (9712345677)",
  dob:'Enter a valid date of birth'
};
export interface DialogData {
  
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  show:boolean =false;
  hide:boolean;
  signUpForm:FormGroup;
  passwordValue:string;
  cErrorMessage:string;
  confirmPasswordValue:string;
  maxDate = new Date();
  mobile = new FormControl();
  dob = new FormControl();
  constructor(public fb: FormBuilder,public dialogRef: MatDialogRef<LoginPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 

    }

    
  ngOnInit() {
    this.signUpForm = this.fb.group({
      email :['', [
        Validators.required,
        Validators.email,
      ]],
      name: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
    ]],
      dob:['', [Validators.required]],
      mobile:['', [
        Validators.required,
        Validators.pattern(/([7-9]{1}[0-9]{9})/)
      ]],
      // passwordGroup: this.fb.group({
        password: ['', [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{7,20}$/)
        ]],
        confirmPassword: ['', Validators.required]
    //  { validator: CustomValidators.childrenEqual})
},{ validator: CustomValidators.childrenEqual});
    
    
  }

  getPhoneErrorMessage() {
    return this.mobile.hasError('required') ? 'You must enter a value' :
      this.mobile.hasError('pattern') ? 'Enter valid mobile number':'';
  }

  // getRequiredErrorMessage(field) {
  //   if(this.confirmPasswordValue!=this.passwordValue){
  //     return this.cPassword.hasError('') ? 'Password mismatch':''
  //   }
  //   return this.signUpForm.get(field).hasError('required') ? 'You must enter a value' : '';
    
  // }

  // getEmailErrorMessage() {
  //   return this.emailControl.hasError('required') ? 'You must enter a value' :
  //     this.emailControl.hasError('email') ? 'Enter valid email id' : '';
  // }

  // getPasswordErrorMessage(){
  //   return this.pControl.hasError('required') ? 'You must enter a value' :
  //     this.pControl.hasError('pattern') ? 'Enter valid password' : '';
  // }


  register(){

  console.log('success')
  }
    
  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
