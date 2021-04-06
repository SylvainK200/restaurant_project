export class FeedBackDish {
    author : string;
    comment: string;
    rating:number;
    date : string;

    constructor(){
        this.author='';
        this.comment='';
        this.rating=5;
        this.date=Date();
    }
}