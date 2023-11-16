import Swal from "sweetalert2";

export default class Response {
    public static mensagemErro(mensagem: string): any {
        return Swal.fire({
            icon: "error",
            timer: 1000,
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

    public static mensagemToast(mensagem: any): any {
        return Swal.mixin({
            text: mensagem,
            toast: true,
            showConfirmButton: false,
            timer: 1000,
            position: "top",
        }).fire();
    }
}
