import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private api:ApiserviceService) { }

  readUser : any;
  ngOnInit(): void {
    this.api.getAllUsers().subscribe((res)=>{
      console.log("Get All Data",res);
      this.readUser = res.data;
    });
  }

}
