import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material'


@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      Material.MatToolbarModule,
      Material.MatFormFieldModule,
      Material.MatIconModule,
      Material.MatInputModule,
      Material.MatButtonModule,
      Material.MatTableModule,
      Material.MatPaginatorModule,
      Material.MatProgressSpinnerModule,
      Material.MatSortModule,
      Material.MatDialogModule,
      Material.MatSelectModule,
      Material.MatCardModule,
      Material.MatDatepickerModule,
      Material.MatNativeDateModule
    ],
    exports: [
      Material.MatToolbarModule,
      Material.MatFormFieldModule,
      Material.MatIconModule,
      Material.MatInputModule,
      Material.MatButtonModule,
      Material.MatTableModule,
      Material.MatPaginatorModule,
      Material.MatProgressSpinnerModule,
      Material.MatSortModule,
      Material.MatDialogModule,
      Material.MatSelectModule,
      Material.MatCardModule,
      Material.MatDatepickerModule,
      Material.MatNativeDateModule
    ]
})
  export class MaterialModule { }
  