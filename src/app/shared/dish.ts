import{Comment} from './comment';
export class Dish{
    id : string;
    name: string;
    image : string;
    category : string;
    featured : boolean;
    price : string;
    description : string;
    label : string;
    comments: Comment[];

    constructor( ){
        this.id ="";
        this.name = ""; 
        this.image="";
        this.category="";
        this.featured = true;
        this.price ="";
        this.description = "";
        this.label = "";
        this.comments=[];
    }
   
}