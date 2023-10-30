import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { DeviceEvent } from "../../types/device-event";

type State = {
  showProcessAlarmModal: boolean;
  showEventsFilterModal: boolean;
  selectedEvents: DeviceEvent[];
  Events: any[];
  selectedEventsId: any[];
};

const initialState: State = {
  showProcessAlarmModal: false,
  showEventsFilterModal: false,
  selectedEvents: [],
  Events: [],
  selectedEventsId:[],
};



const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setShowProcesslarmModal(state, action: PayloadAction<boolean>) {
      state.showProcessAlarmModal = action.payload;
    },
    setShowEventsFilterModal(state, action: PayloadAction<boolean>) {
      state.showEventsFilterModal = action.payload;
    },
    setSelectedEvents(state, action: PayloadAction<DeviceEvent[]>) {
      state.selectedEvents = action.payload;
    },
    setEvents(state,action: PayloadAction<any>){
      console.log("state",...state.Events,action.payload)
      const data = [...state.Events, {
        pageIndex: action.payload.pageIndex,
        data: action.payload.data,
        pageSize:action.payload.pageSize,
      }]

      const jsonObject = data.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse)
      
      state.Events = uniqueArray;
      
    },
    setSelectedEventsId(state,action:PayloadAction<any>){
      const EventIds=[...state.selectedEventsId,...action.payload]
      const jsonObject = EventIds.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse)
state.selectedEventsId = uniqueArray;

    }
  },
});

export const events = eventsSlice.reducer;

export const {
  setShowProcesslarmModal,
  setShowEventsFilterModal,
  setSelectedEvents,
  setEvents,
  setSelectedEventsId
} = eventsSlice.actions;
