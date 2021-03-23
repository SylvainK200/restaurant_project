export class Promotion {
    id: string;
    name: string;
    image: string;
    label: string;
    price: string;
    featured: boolean;
    description: string;

    constructor(){
        this.id = "";
        this.image="";
        this.name="";
        this.label="";
        this.price="";
        this.featured=false;
        this.description="";
    }
}