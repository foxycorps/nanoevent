type Key = string;
type Handler = (...event: unknown[]) => void;

class Listener {
    constructor(public callback: Handler, public once: boolean) { }
}

export default class NanoEvent {
    constructor(private listeners: any = {}) { };

    on(type: Key, handler: Handler, once: boolean): void {
        const listen = new Listener(handler, once);
        if (!this.listeners[type]) {
            this.listeners[type] = listen
        }
        if (!Array.isArray(this.listeners[type])) this.listeners[type] = [this.listeners[type]];
        this.listeners[type]!.push(listen);
    }

    once(type: Key, handler: Handler): void {
        this.on(type, handler, true);
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
    emit(type: Key, ...data: unknown[]): void {
        const events = this.listeners;
        const listeners: Listener[] = [...(Array.isArray(events[type]) ? events[type] : [events[type]]), ...(Array.isArray(events['*']) ? events['*'] : [events['*']])].filter(Boolean);
        const length = Array.isArray(listeners) ? listeners.length : 0;

        if (listeners == null || length == 0) {
            return
        }

        if (length === 1) {
            const { callback, once } = listeners[0];
            callback(...data);

            if (once) events[type] = undefined;
            return
        }

        for (let index = 0; index < length; index++) {
            const { callback, once } = listeners[index];
            callback(...data);

            if (once) events[type].splice(index, 1);
        }


    }
}
