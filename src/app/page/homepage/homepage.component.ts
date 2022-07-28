import { Component, OnInit } from '@angular/core';
// import {AngularFireDatabase} from 'angularfire2/database';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // console.log(this.db.list("/user"))
  }

}
