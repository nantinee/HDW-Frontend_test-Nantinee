import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linkbox',
  templateUrl: './linkbox.component.html',
  styleUrls: ['./linkbox.component.css']
})
export class LinkboxComponent implements OnInit {

  constructor() { }
  public login = localStorage.getItem("isLogin")
  ngOnInit(): void {
  }

}
