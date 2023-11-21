import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Response from "../api/Response";

export default class FirebaseClient {
    // configs
    private firebaseConfig: object = {
        apiKey: "AIzaSyDp_xRoiDNfhlFk0_W6Bzzk9ioRPUdZukk",
        authDomain: "js-teste-30407.firebaseapp.com",
        projectId: "js-teste-30407",
        storageBucket: "js-teste-30407.appspot.com",
        messagingSenderId: "260477091428",
        appId: "1:260477091428:web:87d15f76b17473bc6d6971",
    };

    private mensagens: any;
    // instancia de app
    private app: FirebaseApp;

    constructor() {
        // inicializando o firebase
        this.app = initializeApp(this.firebaseConfig);
        // Chamando instancia que recebe as mensagens
        this.mensagens = getMessaging(this.app);

        // fica ouvindo as mensagens que vao acontecer em primeiro plano
        // this.recuperarToken();
    }

    public async receberMensagens(arrayNotificacoes: any) {
        onMessage(this.mensagens, (payload) => {
            Response.notificacaoToast()
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
