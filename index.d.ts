declare module '@foxycorps/nanoevent' {

    type cb = (...data: any[]) => void;

    declare class NanoEvent {
        constructor();
        remover(type: string, pos: number): void;
        on(type: string, callback: cb, once?: boolean): (() => void);
        once(type: string, callback: cb): void;
        emit(type: string, ...data: any[]): void;
    }
    export default NanoEvent;

}