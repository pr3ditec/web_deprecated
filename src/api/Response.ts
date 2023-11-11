import Swal from 'sweetalert2'


export default class Response{

    public static mensagemErro(mensagem: string) : any{
        return Swal.fire({
            icon: 'error',
            timer: 1000,
            showConfirmButton: false,
            text: mensagem
        })
    }

    public static mensagemSucesso(mensagem: string) : any{
        return Swal.fire({
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
            text: mensagem
        })
    }

}