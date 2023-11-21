import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Response from "../api/Response";

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
        // Chamando instancia que recebe as mensagens
        this.mensagens = getMessaging(this.app);
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

    public recuperarToken() {
        getToken(this.mensagens).then((response) => {
            console.log(response);
        });
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
}
