import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidateBasic } from 'src/app/core/models/candidate.model';

@Component({
  selector: 'app-more-dailogue-box',
  templateUrl: './more-dailogue-box.component.html',
  styleUrls: ['./more-dailogue-box.component.scss']
})
export class MoreDailogueBoxComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public candidate: CandidateBasic) {
    
  }
  /* constructor(private dialogRef: MatDialogRef<MoreDailogueBoxComponent>) {}
  
  ngOnInit(): void {
      
  }
  
  closeDialog() {
    this.dialogRef.close();
  } */
}

