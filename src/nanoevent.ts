type Key = string;
type Handler = (...event: unknown[]) => void;

class Listener {
    constructor(public callback: Handler, public once: boolean) { }
}

export default class NanoEvent {
    constructor(private listeners: any = {}) { };

    remover(type: Key, pos: number) {
        if (pos === -1) {
            this.listeners[type] = undefined;
            return
        }
        this.listeners.splice(pos, 1);
        if (this.listeners[type].length === 0) this.listeners[type] = undefined;
        if (this.listeners[type].length === 1) this.listeners[type] = this.listeners[type][0]
    }

    on(type: Key, handler: Handler, once: boolean): () => void {
        const listen = new Listener(handler, once);
        if (!this.listeners[type]) {
            this.listeners[type] = listen
            return () => this.remover(type, -1);
        }
        if (!Array.isArray(this.listeners[type])) this.listeners[type] = [this.listeners[type]];
        const pos = this.listeners[type]!.push(listen);
        return () => this.remover(type, pos);
    }

    once(type: Key, handler: Handler): void {
        this.on(type, handler, true);
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
