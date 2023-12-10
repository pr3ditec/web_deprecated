export default class Host {
    public async isLocalhost(): Promise<boolean> {
        const url: string = window.location.href;

        const locals: string[] = [
            "localhost",
            "docker.dev",
            "local.dev",
            "dev.br",
            "127.0.0.1",
        ];

        return locals.some((local) => url.includes(local));
    }

    public async isServer(): Promise<boolean> {
        return !this.isLocalhost();
    }
}
