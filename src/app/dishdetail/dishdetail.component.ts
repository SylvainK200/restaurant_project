import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {Dish} from "../shared/dish";
import { DishService } from '../services/dish-service.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {switchMap}from 'rxjs/operators';
import {FormBuilder,FormGroup,NgForm,Validators} from '@angular/forms';
import {Comment} from '../shared/comment';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective?:NgForm;
  dish?: Dish;
  dishIds:string[] = [];
  prev : string="";
  next :string = "";
  commentForm: FormGroup;
  comment:Comment=new Comment();

  formErrors : any ={
    'author': '',
    'comment': '',
  };

  validationMessages:any ={
    'author': {
      'required':      'author is required.',
      'minlength':     'author must be at least 2 characters long.',
      'maxlength':     'author cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'comment is required.',
      'minlength':     'comment must be at least 10 characters long.',
      
    }
  }

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { 
    this.dishservice.getDish("k").subscribe(dish=>this.dish=dish)

    this.commentForm=this.fb.group({
      author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      comment:['',[Validators.required,Validators.minLength(10)]],
      rating:[5,Validators.required],
      
    });
    this.commentForm.valueChanges.subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
    
    }

    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
      
        if (field in this.formErrors) {
           //clear previous error message (if any)
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key) ) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          } 
          else if (this.commentForm.valid){
            this.comment = this.commentForm.value;
          }
        }
        
      }
    }

  ngOnInit() {
    this.dishservice.getDishId().subscribe(dishIds=>this.dishIds=dishIds);

    this.route.params.pipe  (switchMap((params:Params)=>this.dishservice.getDish(params['id'])))
    .subscribe(dish=>{this.dish=dish;this.setPrevNext(dish.id)})
  }

  goBack(): void {
    this.location.back();
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  formatLabel(value: number) {
    return value;
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date=Date();
    this.dish?.comments.push(this.comment);
    this.commentForm?.reset({
      author : "",
      rating:5,
      comment:'',
    });
  
    
  }
}
