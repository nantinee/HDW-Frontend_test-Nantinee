import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  constructor(private route:Router) { }
  public login  = localStorage.getItem('isLogin')
  public nowPath = window.location.pathname
  clearStore(){
    localStorage.clear()
    this.route.navigateByUrl("")
  }
  ngOnInit(): void {
    console.log(this.nowPath)
  }

}
