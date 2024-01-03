import { getBaseURL } from "@/helpers/Host";
import axios from "axios";

export default class Api {
    private request: any;

    constructor(token: any) {
        this.request = axios.create({
            timeout: 10000,
            headers: {
                Authorization: `Bearer ${
                    token ?? localStorage.getItem("user.token")
                }`,
                "origin-request": "admin",
            },
        });
    }

    public async pegarDadosApi(rota: string, data: any = {}): Promise<any> {
        try {
            let baseURL = await getBaseURL();
            this.request.defaults.baseURL = baseURL;

            let response: any = await this.request.get(rota);
            return await response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return await error.response.data;
                }
            }
        }
    }

    public async enviarDadosApi(rota: string, data: any = {}): Promise<any> {
        try {
            let baseURL = await getBaseURL();
            this.request.defaults.baseURL = baseURL;

            let response: any = await this.request.post(rota, (data = data));

            return await response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return await error.response.data;
                }
            }
        }
    }

    public async atualizarDadosApi(rota: string, data: any): Promise<any> {
        try {
            let baseURL = await getBaseURL();
            this.request.defaults.baseURL = baseURL;

            let response: any = await this.request.put(rota, (data = data));

            return await response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return await error.response.data;
                }
            }
        }
    }
}
