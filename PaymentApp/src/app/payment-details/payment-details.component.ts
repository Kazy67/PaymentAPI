import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  standalone: false,
  templateUrl: './payment-details.component.html',
  styles: ``
})
export class PaymentDetailsComponent implements OnInit{
 constructor(public service: PaymentDetailService, private toastr: ToastrService){

  }
  ngOnInit(): void {
    this.service.refreshList();
  } 

  populateForm(selectedRecord: PaymentDetail){
    this.service.formData = Object.assign({}, selectedRecord) 
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?')){
       this.service.deletePaymentDetail(id)
     .subscribe({
          next: res => {
            this.service.list = res as PaymentDetail[]
            this.toastr.error('Deleted Successfully', 'Payment Detail Register')
          },
          error: err => {
            console.log(err)
          }
        })
    }else{
      this.toastr.info('That is good to save your card records.')
    }
   
  }


}
