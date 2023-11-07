import axios from 'axios'

export default class Api{
    
    public axiosConn : any;
    private token:string;

    constructor(url: string, token: string ){

        this.token = token

        this.axiosConn = axios.create({
            baseURL: url,
            timeout: 1000,
            headers:{
                "Content-Type": "application/json",
                "Authorization": this.token
            }
        })
    }


    public async pegarDadosApi(rota:string, data:any={}) : Promise<Array<any>>{

        let response:any = await this.axiosConn.get(rota,data)

        return response.data.list
    }


    public setToken(token:string):void {
        this.token = token
    }


}