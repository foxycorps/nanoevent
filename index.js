class Listener {
    constructor(callback, once) {
        this.callback = callback;
        this.once = once;
    }
}

class NanoEvent {
    constructor() {
        this.events = {}
    }

    remover(type, pos) {
        if (pos === -1) {
            return this.events[type] = undefined;
        }
        this.events.splice(pos, 1);
        if (this.events[type].length === 0) this.events[type] = undefined;
        if (this.events[type].length === 1) this.events[type] = this.events[type][0];
    }

    on(type, callback, once = false) {

        if (Array.isArray(type)) {
            return type.map((subType) => this.on(subType, callback, once))
        }

        const e = new Listener(callback, once);
        if (!this.events[type]) {
            this.events[type] = e;
            return () => this.remover(type, -1)
        }
        if (!Array.isArray(this.events[type])) this.events[type] = [this.events[type]];
        const pos = this.events[type].push(e);
        return () => this.remover(type, pos);
    }

    once(type, callback) {
        return this.on(type, callback, true);
    }

    emit(type, ...data) {
        const events = this.events;
        const listeners = this.events[type];
        const length = Array.isArray(listeners) ? listeners.length : 0;

        if (length === 0) {
            const { callback, once } = listeners || new Listener(() => { });
            callback(...data);
            if (once) events[type] = undefined;
        }

        for (let index = 0; index < length; index++) {
            const { callback, once } = listeners[index];
            callback(...data);

            if (once) this.events[type].splice(index, 1);
        }

        if (length >= 1) this.events[type] = this.events[type].filter(Boolean)
    }
}

module.exports = NanoEvent