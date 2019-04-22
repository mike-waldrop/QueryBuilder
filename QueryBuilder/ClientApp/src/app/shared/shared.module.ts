import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { DialogsModule } from "@progress/kendo-angular-dialog";
import { GridModule } from "@progress/kendo-angular-grid";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { PopupModule } from "@progress/kendo-angular-popup";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { ExcelExportModule } from "@progress/kendo-angular-excel-export";
import { ScrollViewModule } from "@progress/kendo-angular-scrollview";
import { LabelModule } from "@progress/kendo-angular-label";
import { TileComponent } from './tile/tile.component';

@NgModule({
  declarations: [TileComponent],
  imports: [
    CommonModule,
    InputsModule,
    BrowserAnimationsModule,
    ButtonsModule,
    DropDownsModule,
    ChartsModule,
    DialogsModule,
    GridModule,
    LayoutModule,
    PopupModule,
    DateInputsModule,
    ExcelExportModule,
    ScrollViewModule,
    LabelModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    InputsModule,
    BrowserAnimationsModule,
    ButtonsModule,
    DropDownsModule,
    ChartsModule,
    DialogsModule,
    GridModule,
    LayoutModule,
    PopupModule,
    DateInputsModule,
    ExcelExportModule,
    ScrollViewModule,
    LabelModule,
    FormsModule,
    ReactiveFormsModule,
    TileComponent
  ]
})
export class SharedModule {
}
