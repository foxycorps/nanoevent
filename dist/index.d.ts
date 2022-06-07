declare type Key = string;
declare type Handler = (...event: unknown[]) => void;
export declare class NanoEvent {
    private listeners;
    constructor(listeners?: Map<any, any>);
    on(type: Key, handler: Handler): void;
    once(type: Key, handler: Handler): void;
    off(type: Key, handler?: Handler): void;
    emit(type: Key, ...events: unknown[]): void;
}
declare const _default: NanoEvent;
export default _default;
