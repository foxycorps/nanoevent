type Key = string;
type Handler = (...event: unknown[]) => void;

export default class NanoEvent {
    constructor(private listeners = new Map()) { };

    on(type: Key, handler: Handler): void {
        let handlers: Array<Handler> | undefined = this.listeners!.get(type);
        if (handlers) {
            handlers.push(handler);
        } else {
            this.listeners!.set(type, [handler] as Handler[])
        }
    }
    once(type: Key, handler: Handler): void {
        this.on(`once:${type}`, (...event: unknown[]) => {
            handler(event);
            this.listeners!.set(`once:${type}`, []);
        });
    }
    off(type: Key, handler?: Handler): void {
        let handlers: Array<Handler> | undefined = this.listeners!.get(type);
        if (handlers) {
            if (handler) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            } else {
                this.listeners!.set(type, []);
            }
        }
    }
    emit(type: Key, ...events: unknown[]): void {
        const handlers: Handler[] = [...this.listeners!.get(type), ...this.listeners!.get('*'), ...this.listeners!.get(`once:${type}`)].filter(Boolean)
        handlers.map((handler: Handler) => {
            handler(...events!);
        })
    }
}
