import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

export default class Response {
    public static mensagemToast(status: any, mensagem: any): any {
        return Swal.mixin({
            icon: status ? "success" : "error",
            animation: true,
            text: mensagem,
            toast: true,
            showConfirmButton: false,
            timer: 2000,
            position: "top",
        }).fire();
    }

    public static async confirmToast(mensagem: any) {
        return Swal.mixin({
            toast: true,
            icon: "question",
            title: mensagem,
            position: "center",
            showConfirmButton: true,
            showCancelButton: true,
        })
            .fire()
            .then((data) => {
                if (data.isConfirmed) {
                    return true;
                } else {
                    return false;
                }
            });
    }
}
