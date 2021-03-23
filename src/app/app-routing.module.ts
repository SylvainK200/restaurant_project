import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'menu',component:MenuComponent},
  { path: 'dishdetail/:id',     component: DishdetailComponent },
  {path: 'aboutus' ,component : AboutComponent},
  { path: 'contactus',     component: ContactComponent },
  {path:'',redirectTo:'/home',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
