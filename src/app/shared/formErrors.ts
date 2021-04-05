
export class Required {
    'required' : string  = '';
}
export class FormErrors {
    'firstname': string = '';
    'lastname':string = '';
    'telnum':string ='';
    'email':string = '';
}

export class ValidationMessageName extends Required{
    
    'minlength' : string = '';
    'maxlength' : string = '';
}

export class TelNum extends Required{
    
    'pattern' : string = '';

}

export class Email extends Required{
    
    'email': string = '';
}