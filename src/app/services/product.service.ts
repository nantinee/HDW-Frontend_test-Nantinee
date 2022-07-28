import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../database/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }
  addProduct(product: Product) {
    const productsRef = collection(this.firestore, 'products');
    return addDoc(productsRef, product);
  }

  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<Product[]>;
  }
  deleteProduct(product: Product) {
    const productsRef = doc(this.firestore, `products/${product.id}`);
    return deleteDoc(productsRef);
  }
  getProductByID(id: string) {
    const bookRef = doc(this.firestore, `products/${id}`);
    return docData(bookRef, { idField: 'id' }) as Observable<Product>;
  }

  updateProduct(product: Product) {
    const bookDocRef = doc(this.firestore, `products/${product.id}`);
    return setDoc(bookDocRef, product);
  }


}
