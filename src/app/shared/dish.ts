export class Dish{
    id : string;
    name: string;
    image : string;
    category : string;
    featured : boolean;
    price : string;
    description : string;
    label : string;

    constructor( id:string,name : string,image:string,category:string,
        featured : boolean,price : string,description: string,
        label:string){
        this.id =id;
        this.name = name; 
        this.image = image;
        this.category=category;
        this.featured = featured;
        this.price =price;
        this.description = description;
        this.label = label;
    }
}