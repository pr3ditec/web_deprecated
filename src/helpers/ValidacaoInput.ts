

export default class Validacao{
    
    constructor(){
        console.log("skrr")
    }

    public static email(email: string) : boolean{

        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){

            return true
        }

        return false
    } 

    public static cpf(cpf: string): boolean{

        if(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(cpf)){
            
            return  true
        }
        return false
    }

    


}