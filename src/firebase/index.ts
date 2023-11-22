import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Response from "../api/Response";
import axios from "axios";

export default class FirebaseClient {
    // configs
    private firebaseConfig: object = {
        authDomain: "sauvvitech-e6b9c.firebaseapp.com",
        apiKey: "AIzaSyCgHpbq5-JlDhxaABnkNmqiMj-E-oYA6hg",
        appId: "1:601401587384:android:1b69a7e478cd58b090664d",
        messagingSenderId: "601401587384",
        projectId: "sauvvitech-e6b9c",
        storageBucket: "sauvvitech-e6b9c.appspot.com",
    };

    private mensagens: any;
    // instancia de app
    private app: FirebaseApp;

    constructor() {
        // inicializando o firebase
        this.app = initializeApp(this.firebaseConfig);
        this.mensagens = getMessaging(this.app);
        // Chamando instancia que recebe as mensagens
        // console.log(window.navigator)
    }

    public async receberMensagens(arrayNotificacoes: any) {
        onMessage(this.mensagens, (payload) => {
            Response.notificacaoToast();
            arrayNotificacoes.value.push({
                id: 1,
                profile: "user-profile.jpeg",
                mensagem: payload.data?.mensagem,
                titulo: payload.data?.titulo,
            });
        });
    }

    private async recuperarToken(): Promise<string> {
        // var token = "token";
        // getToken(this.mensagens).then((res) => {
        //     token = res;
        // });
        return await getToken(this.mensagens);
    }

    private permitirNotificacoes() {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                return true;
            } else {
                return false;
            }
        });
    }

    public async cadastrarDispositivo() {
        const userAgentData = window.navigator.userAgent.toLocaleLowerCase();
        const versionData = userAgentData.split("(")[1].split(" ");
        let dataAxios = {
            system: userAgentData.includes("windows")
                ? "windows"
                : userAgentData.includes("linux")
                  ? "linux"
                  : userAgentData.includes("android")
                    ? "android"
                    : userAgentData.includes("iphone")
                      ? "iphone"
                      : "desconehcido",
            version: `${versionData[1]}${versionData[2]}`,
            brand: userAgentData.includes("windows")
                ? "microsoft"
                : userAgentData.includes("iphone")
                  ? "apple"
                  : userAgentData.includes("ubuntu")
                    ? "ubuntu"
                    : userAgentData.includes("debian")
                      ? "debian"
                      : "desconhecido",
            browser: window.navigator.userAgent.includes("Chrome")
                ? "chrome"
                : window.navigator.userAgent.includes("Firefox")
                  ? "firefox"
                  : "unknow",
            token: await this.recuperarToken(),
        };
        axios.post("http://127.0.0.1:8001/dispositivo/admin/", dataAxios, {
            headers: {
                "origin-request": "admin",
                Authorization: localStorage.getItem("user.token"),
            },
        });
    }
}
