import Swal from "sweetalert2";
import { useAppStore } from "@/stores";

export default class Response {
    public static mensagemErro(mensagem: string): any {
        return Swal.fire({
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
            text: mensagem,
        });
    }

    public static mensagemSucesso(mensagem: string): any {
        return Swal.fire({
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            text: mensagem,
        });
    }

    public static mensagemToast(icon: any, mensagem: any , time: boolean = true): any {
        return Swal.mixin({
            icon: icon,
            animation: true,
            text: mensagem,
            toast: true,
            showConfirmButton: false,
            timer: time ? 2000 : Infinity,
            position: "top",
        }).fire();
    }

    public static notificacaoToast(): any {
        var store = useAppStore();
        return Swal.mixin({
            icon: "info",
            toast: true,
            showConfirmButton: false,
            background: store.isDarkMode ? "dark" : "white",
            timer: 1500,
            position: "top",
        }).fire();
    }

    public static async mesagemConfirmacao(
        icon: any,
        confirm: string,
        cancel: string,
        mensagem: string = "",
    ): Promise<boolean> {
        return await Swal.fire({
            icon: icon,
            confirmButtonText: confirm,
            text: mensagem,
            showCancelButton: true,
            cancelButtonText: cancel,
            focusCancel: false,
            position: "center",
        }).then((response) => {
            if (response.isConfirmed) {
                return true;
            } else {
                return false;
            }
        });
    }

    public static ajuda(mensagem: string) {
        Swal.fire({
            icon: "info",
            animation: true,
            text: mensagem,
            showConfirmButton: false,
        });
    }
}
