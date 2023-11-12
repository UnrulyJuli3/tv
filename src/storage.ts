const query = new URLSearchParams(window.location.search);

export const setupStorage = (tag?: string, code?: string) => {
    delete (window as any).tv.storage;

    const storage: any = {
        namespace: query.get("namespace") ?? query.get("ns") ?? "tv",
        isDisabled: query.has("incognito") || query.has("nc"),
    };

    if (tag) storage.tag = tag;

    if (code) {
        storage.code = code.toLowerCase();
        Object.keys(window.localStorage).forEach(key => {
            const parts = key.split(":code:");
            if (parts.length >= 2 && parts[1] !== storage.code) window.localStorage.removeItem(key);
        });
    }

    (window as any).tv.storage = storage;
};