import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/database/product.model';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }
  public image: any
  public size: string = "0"
  public isList: any = true
  public collectionSize = 50
  public page = 1
  public pageSize = 10
  public name = ''
  public serialCode = ''
  public price = ''
  public productSize = ''
  public detail = ''
  public bestsale = false
  public productsList: any = []
  public dataClone: any[] = []
  public imageBase64: any
  public qt = 0
  private edit = false
  public deleteList: any = []
  public searchProduct = ''



  // check when click edit
  checkEdit() {
    this.edit == true ? this.editProduct() : this.addProduct()
  }
  // convert to base64 for keep the picture to firestore
  public handleChangeImage(e: any) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.image = reader.result;
      reader.onloadend = () => { this.imageBase64 = reader.result };
      reader.readAsDataURL(file);
    }

  }
  handleChange(e: any) {
    this.productSize = e.value
  }
  handleChangeBestSaler(e: any) {
    this.bestsale = e.checked
  }
  refreshProduct() { }
  public handleChangeTable(value: any) {
    this.isList = value
    value==true?this.formreset():''
  }
  formreset() {
    this.serialCode = ''
    this.name = ''
    this.image = ''
    this.qt = 0
    this.imageBase64 = ''
    this.price = ''
    this.productSize = ''
    this.detail = ''
    this.bestsale = false
  }
  // CRUD Product
  addProduct() {
    const params = {
      serialCode: this.serialCode,
      name: this.name,
      image: this.imageBase64,
      genre: new Date(),
      quantity: this.qt,
      price: Number(this.price),
      size: this.productSize,
      detail: this.detail,
      bestSaleler: this.bestsale
    }
    if (this.name != '' && this.serialCode != '' && this.productSize != '' && this.price != '0') {
      const checkSerial = this.productsList.findIndex((data: any) => data.serialCode == params.serialCode)
      if (checkSerial == -1) {
        this.productService.addProduct(params).then(() => this.formreset()).then(() => alert("SUCEESS ADD Product"))
        setTimeout(() => {
          this.isList = true
          window.location.reload()
        }, 2000);
      } else {
        alert("หมายเลข serial number สินค้านี้มีข้อมูลอยู่แล้ว")
      }

    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน")
    }


  }
  setEditProduct(product: any) {
    this.isList = false
    this.serialCode = product.serialCode
    this.name = product.name
    this.image = product.image
    this.qt = product.quantity
    this.price = String(product.price)
    this.productSize = product.size
    this.detail = product.detail
    this.bestsale = Boolean(product.bestSaleler)
    this.edit = true
  }
  editProduct() {
    const params = {
      serialCode: this.serialCode,
      name: this.name,
      image: this.imageBase64,
      genre: new Date(),
      quantity: this.qt,
      price: Number(this.price),
      size: this.productSize,
      detail: this.detail,
      bestSaleler: this.bestsale
    }
    const checkSerial = this.productsList.findIndex((data: any) => data.serialCode = params.serialCode)
    if (checkSerial != -1) {
      if (confirm('Are you sure to update this record ?') == true) {
        this.productService.updateProduct(params).then(() =>
          console.log('UPDATE successful'));
      }
      setTimeout(() => {
        this.isList = true
        this.formreset()
        window.location.reload()
      }, 2000);
    } else {
      alert("ไม่พบหมายเลข serial number สินค้าที่ทำการแก้ไข กรุณาเลือกเพิ่มข้อมูลใหม่")
    }
  }
  collectListDelete(item:any,e:any){
    if (e.checked) {
      this.deleteList.push(item)
    }else{
      const check = this.deleteList.findIndex((data:any)=>data.id = item.id)
      check != -1? this.deleteList.splice(check,1):''
    }
  }
  deleteProduct(product: any) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.productService.deleteProduct(product).then(() =>
        console.log('delete successful'));
    } else {
      this.formreset()
    }
  }
  deleteMultiProduct(){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.deleteList.map((product:any)=>{
        this.productService.deleteProduct(product).then(() =>
        console.log('delete successful'));
      })
      this.deleteList.splice(0,this.deleteList.length)
    }
  }
  // AUTO complete Search
  formatter = (x:{name:string}) => x.name;
  search: OperatorFunction<string, readonly {}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? this.productsList
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
  searchText(e: any) {
    this.searchProduct = e.name
  }
  // Call API From firestore
  ngOnInit(): void {
    this.edit = false
    this.formreset()
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.productsList = res;
      this.dataClone = res
      this.collectionSize = this.dataClone.length
    })
  }

}
