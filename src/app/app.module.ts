import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MenuService } from './services/menu.service';
import { SidenavComponent } from './components/sidenav.component';

import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigableListDirective } from './directives/navigable-list.directive';
import { NavigableListItemDirective } from './directives/navigable-list-item.directive';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([]),
    MatListModule,
    MatTabsModule,
    MatTooltipModule,
    MatIconModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    SidenavComponent,
    NavigableListDirective,
    NavigableListItemDirective,
  ],
  providers: [MenuService],
  bootstrap: [AppComponent],
})
export class AppModule {}
