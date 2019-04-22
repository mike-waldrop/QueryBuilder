import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import "hammerjs";
import { CoreModule } from "src/app/core/core.module";
import { SharedModule } from "src/app/shared/shared.module";
import { AppRoutingModule } from "src/app/app-routing.module";
import { PageNotFoundComponent } from "src/app/page-not-found.component";
import { RulesModule } from "src/app/rules/rules.module";
import { QueryBuilderModule } from "src/app/query-builder/query-builder.module";


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    RulesModule,
    QueryBuilderModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


//providers: [ErrorService,
//    { provide: ErrorHandler, useClass: ErrorService }],
