import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent  {
  canDelete: boolean;

  @Output() delete = new EventEmitter<boolean>();

  // tslint:disable-next-line: typedef
  prepareForDelete() {
    this.canDelete = true;
  }

  // tslint:disable-next-line: typedef
  cancel() {
    this.canDelete = false;
  }

  // tslint:disable-next-line: typedef
  deleteBoard() {
    this.delete.emit(true);
    this.canDelete = false;
  }



}
