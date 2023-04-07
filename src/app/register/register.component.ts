import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  //userForm!: FormGroup 

  constructor(private api:ApiserviceService) { }

  errMsg: any;
  successMsg: any;

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    'FirstName':new FormControl('',[Validators.required,Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')]),
    'LastName':new FormControl('',Validators.required),
    'Email':new FormControl('',Validators.required),
    'Phone':new FormControl('',Validators.required),
    'OrgnizationName':new FormControl('',Validators.required),
    'OrgnizationAdd':new FormControl('',Validators.required),
    'Password':new FormControl('',Validators.required)
  });

  userSubmit()
  {
    //console.log(this.userForm.value);
    if(this.userForm.valid)
    {
      console.log(this.userForm.value);
      this.api.createData(this.userForm.value).subscribe((res)=>{
        console.log(res, 'Data added Successfully');
        this.userForm.reset();
        this.successMsg = res.message;
      });
    }
    else
    {
      this.errMsg = "All fields are required and First letter of First Name should be capital";

    }
  }

}
