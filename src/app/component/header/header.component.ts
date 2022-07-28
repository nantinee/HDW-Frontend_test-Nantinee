import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerComponent',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  public headerImageLink = [
    "https://preview.colorlib.com/theme/ashion/img/instagram/insta-1.jpg",
    "https://preview.colorlib.com/theme/ashion/img/instagram/insta-2.jpg",
    "https://preview.colorlib.com/theme/ashion/img/instagram/insta-3.jpg",
    "https://preview.colorlib.com/theme/ashion/img/instagram/insta-4.jpg",
    "https://preview.colorlib.com/theme/ashion/img/instagram/insta-5.jpg",
    "https://preview.colorlib.com/theme/ashion/img/instagram/insta-6.jpg"

  ]

  ngOnInit(): void {
  }

}
