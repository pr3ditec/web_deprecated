import axios, { type AxiosResponse } from "axios";

export default class Request {
    public constructor() {
        // axios.defaults.baseURL = "http://54.166.105.60:8080/preditec";
        axios.defaults.baseURL = "http://localhost:8000/preditec"
        axios.defaults.timeout = 5000;
    }

    public get(url: string): Promise<AxiosResponse<any>> {
        this.setAxiosToken(localStorage.getItem("user.token"));
        return axios.get(url);
    }

    public post(url: string, data: any): Promise<AxiosResponse<any>> {
        return axios.post(url, data);
    }

    public put(url: string, data: any): Promise<AxiosResponse<any>> {
        return axios.put(url, data);
    }

    public patch(url: string, data: any): Promise<AxiosResponse<any>> {
        return axios.patch(url, data);
    }

    public del(url: string): Promise<AxiosResponse<any>> {
        return axios.delete(url);
    }

    /** TOKEN */
    public setAxiosToken(value: any) {
        axios.defaults.headers.common["Authorization"] = value;
    }
    /** TOKEN */
}
