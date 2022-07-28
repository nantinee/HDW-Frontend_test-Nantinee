import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';
// database firebase

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// page
import { HomepageComponent } from './page/homepage/homepage.component';
import { ShopComponent } from './page/shop/shop.component';
import { LoginComponent } from './page/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ThumnalsComponent } from './component/thumnals/thumnals.component';
import { LinkboxComponent } from './component/linkbox/linkbox.component';
import { ProductComponent } from './page/product/product.component';
import { SlidebarComponent } from './component/slidebar/slidebar.component';
import { HeaderComponent } from './component/header/header.component';
import { DetailComponent } from './page/detail/detail.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ShopComponent,
    LoginComponent,
    ThumnalsComponent,
    LinkboxComponent,
    ProductComponent,
    SlidebarComponent,
    HeaderComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot() // ToastrModule added
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
