declare type EventType = string;
declare type Handler<T = unknown> = (event: T) => void;
declare const _default: <Events extends Record<string, unknown>>() => {
    on: (type: EventType, handler: Handler<Events[keyof Events]>) => void;
    once: (type: EventType, handler: Handler<Events[keyof Events]>) => void;
    off: (type: EventType, handler?: Handler<Events[keyof Events]> | undefined) => void;
    emit: (type: EventType, evt?: Events[string] | undefined) => void;
};
export default _default;
