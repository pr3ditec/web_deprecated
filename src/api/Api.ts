import axios from 'axios'

export default class Api{

    private request: any;
    private token: string;
    private origin:string;

    constructor(url: string, token: string, origin: string){
        this.token = token
        this.origin = origin

        this.request = axios.create({
            baseURL: url,
            timeout: 2000,
            headers:{
                "Authorization": token,
                "origin-request": origin
            }
        })
    }


    public async pegarDadosApi(rota:string, data:any={}) : Promise<Array<any>>{

        let response:any = await this.request.get(rota);

        return response.data.list
    }

    public async enviarDadosApi(rota:string,data: any={}) : Promise<any>{

        let response:any = await this.request.post(rota, data=data)

        return response.data
    }




}