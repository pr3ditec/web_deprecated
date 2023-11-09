

export default class Sessao{

    private dadosUsuario:any;

    constructor(usuario: any){
        this.dadosUsuario = usuario
        this.salvarEmSessao()
    }

    public alterarSessao(usuario: any) : any{

        this.dadosUsuario = usuario

    }

    private salvarEmSessao():any{
        // salvando em sessao
    }

    private deletarSessao(){
        // alterar sessao
    }


}