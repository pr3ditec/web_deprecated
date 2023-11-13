export default class Validacao {
    public static email(email: string): any {
        let response: any = {
            status: true,
            mensagem: "email válido",
        };

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            response = {
                status: false,
                mensagem: "email não é válido",
            };
        }

        return response;
    }

    public static cpf(cpf: string): any {
        let response: any = {
            status: true,
            mensagem: "cpf é valido",
        };

        if (/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(cpf)) {
            response = {
                status: false,
                mensagem: "cpf não é valido",
            };
        }

        return response;
    }

    public static inputVazio(dataInputs: any): any {
        let response: any = {
            status: true,
            mensagem: "Campos passaram pela validação",
        };

        Object.values(dataInputs).forEach((input) => {
            //@ts-expect-error
            if (input.length == 0) {
                response = {
                    status: false,
                    mensagem: "Campos não podem estar vazios",
                };
            }
        });

        return response;
    }
}
