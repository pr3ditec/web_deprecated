async function isLocalhost(): Promise<boolean> {
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

async function isServer(): Promise<boolean> {
    return !isLocalhost();
}

async function getBaseURL(): Promise<string> {
    const isLocal = await isLocalhost();

    if (isLocal) {
        return "http://localhost:8001";
    } else {
        return "https://api.sauvvitech.com";
    }
}

export { isLocalhost, isServer, getBaseURL };
