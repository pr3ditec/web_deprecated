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

    public static async mesagemConfirmacao(icon: any, confirm: string, cancel: string): Promise<boolean> {
        return await Swal.fire({
            icon: icon,
            iconColor: "#3b3f5c",
            confirmButtonText: confirm,
            confirmButtonColor: "#e7515a",
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonText: cancel,
            cancelButtonColor: "#3b3f5c",
            focusCancel: false,
        }).then((response) => {
            if (response.isConfirmed) {
                return true;
            } else {
                return false;
            }
        });
    }
}
