import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/database/product.model';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private productService:ProductService) { }
  public productsList:any = []
  public dataClone:any[] = []
  public collectionSize = 0
  public page = 1
  public pageSize = 12
  public searchProduct = ''


   // AUTO complete Search
   formatter = (x:{name:string}) => x.name;
   search: OperatorFunction<string, readonly {}[]> = (text$: Observable<string>) =>
     text$.pipe(
       debounceTime(200),
       map(term => term === '' ?[]
         : this.dataClone.filter((v: any) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
     )
      // Enter keydown on search input
   public onKeydown(e: any) {
     if (e.keyCode === 13) {
       this.searchInfo(e.target.value);
     }
   }
   // Search Function for change slide index
   public searchInfo(text: any) {
     var valIndex: any
     valIndex = this.productsList.findIndex((res: any) => res.name == text)
     const toIndex = 0;
     const element = this.dataClone.splice(valIndex, 1)[0];
     this.dataClone.splice(toIndex, 0, element);
     
     if (valIndex != -1) {
       this.dataClone
     } else {
       alert("ไม่พบสินค้าที่ท่านค้นหา")
       this.dataClone = this.productsList
     }
   }
  //  searchText(e: any) {
  //   this.searchProduct = e.name
  // }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: Product[]) => {
      console.log(res)
      this.productsList = res;
      this.dataClone = res
      this.collectionSize = this.dataClone.length
    })
  }

}
