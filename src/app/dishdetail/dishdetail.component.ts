import { Component, Input, OnInit, ViewChild,Inject } from '@angular/core';
import {Dish} from "../shared/dish";
import { DishService } from '../services/dish-service.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {switchMap}from 'rxjs/operators';
import {FormBuilder,FormGroup,NgForm,Validators} from '@angular/forms';
import {Comment} from '../shared/comment';
import { baseUrl } from '../shared/baseUrl';

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
  baseurl : string = baseUrl;
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
  errMess ?: string;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private baseURL : typeof baseUrl) { 
    this.dishservice.getDish("k").subscribe(dish=>this.dish=dish,
      errMess => this.errMess=<any>errMess);

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

    this.route.params
    .pipe  (switchMap((params:Params)=>this.dishservice.getDish(params['id'])))
    .subscribe(dish=>{this.dish=dish;this.setPrevNext(dish.id
      );this.dishCopy=dish},
    errmess => this.errMess = <any>errmess );
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
  dishCopy:Dish=new Dish();
  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date=Date();
    this.commentForm?.reset({
      author : "",
      rating:5,
      comment:'',
    });
  
    this.dishCopy?.comments.push(this.comment);
    this.dishservice.putDish(this.dishCopy)
    .subscribe(dish =>{
      this.dish=dish;
      this.dishCopy=dish;
    },err=>
    {
      this.dish=new Dish();this.dishCopy=new Dish();this.errMess=<any>err;
    })
  }
}
