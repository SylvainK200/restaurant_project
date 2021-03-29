import { Component, OnInit,ViewChild} from '@angular/core';
import {FormBuilder,FormGroup,NgForm,Validators} from '@angular/forms';
import {Feedback,CONTACTTYPE} from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective?:NgForm;

  feedbackForm:FormGroup;
  feedback?:Feedback;
  contactType= CONTACTTYPE;

  constructor( private fb : FormBuilder) {
    this.feedbackForm=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      telnum:[0,Validators.required],
      email:['',Validators.required],
      agree:false,
      contactType:'none',
      message:''
    });
    
   }

  ngOnInit(): void {
  }

  

  onSubmit(){
    this.feedback = this.feedbackForm?.value;
    console.log(this.feedback);
    this.feedbackForm?.reset({
      firstname : "",
      lastname:'',
      telnum:'',
    });
    this.feedbackFormDirective?.reset();
  }
}
