export default class MascarasInput {
    public static cpf(documento: string): string {
        try {
            return documento.replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/g,
                "$1.$2.$3-$4",
            );
        } catch {
            return "";
        }
    }
    public static cnpj(cnpj: string): string {
        try {
            return cnpj.replace(
                /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
                "$1.$2.$3/$4-$5",
            );
        } catch {
            return "";
        }
    }
}
