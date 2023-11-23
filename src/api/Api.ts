import axios from "axios";

export default class Api {
    private request: any;

    constructor() {
        this.request = axios.create({
            baseURL: "http://localhost:8001",
            timeout: 3000,
            headers: {
                Authorization: localStorage.getItem("user.token"),
                "origin-request": "admin",
            },
        });
    }

    public async pegarDadosApi(
        rota: string,
        data: any = {},
    ): Promise<Array<any>> {
        let response: any = await this.request.get(rota);
        return await response.data;
    }

    public async enviarDadosApi(rota: string, data: any = {}): Promise<any> {
        let response: any = await this.request.post(rota, (data = data));

        return await response.data;
    }
}
