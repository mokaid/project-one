import { DeviceEvent } from "./device-event";

export type ReqProcessEvent={
    event:DeviceEvent;
    processStatus:number;
    remarks?:string;
    caseNumber?:string
}
export type ProcessEvent={
    // event:[];
    // processStatus?:number;
    // remarks?:string;
    // caseNumber?:string
}