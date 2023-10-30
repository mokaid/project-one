import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { DeviceEvent } from "../../types/device-event";

type State = {
  showProcessAlarmModal: boolean;
  showEventsFilterModal: boolean;
  selectedEvents: DeviceEvent[];
  Events: any[];
  selectedEventsId: any[];
  globalPageSize: number;
};

const initialState: State = {
  showProcessAlarmModal: false,
  showEventsFilterModal: false,
  selectedEvents: [],
  Events: [],
  selectedEventsId: [],
  globalPageSize: 10,
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
    setEvents(state, action: PayloadAction<any>) {
      const data = [
        ...state.Events,
        {
          pageIndex: action.payload.pageIndex,
          data: action.payload.data,
        },
      ];
      const jsonObject = data?.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

      state.Events = uniqueArray;
    },
    setSelectedEventsId(state, action: PayloadAction<any>) {
      const newSelection = action.payload;
    
      // Check if each new selection is already in the existing selectedEventsId
      newSelection.forEach((item:any) => {
        const index = state.selectedEventsId.indexOf(item);
    
        if (index === -1) {
          // If not in the selectedEventsId, add it

          // state.selectedEventsId.push(item);
          state.selectedEventsId=[...state.selectedEventsId,...action.payload]
        } else {
          // If already in the selectedEventsId, remove it
          state.selectedEventsId.splice(index, 1);
        }
      });
    },
    setGlobalPageSize(state, action: PayloadAction<number>) {
      state.globalPageSize = action.payload;
    },
    clearAllEvents(state) {
      state.Events = [];
    },
  },
});

export const events = eventsSlice.reducer;

export const {
  setShowProcesslarmModal,
  setShowEventsFilterModal,
  setSelectedEvents,
  setEvents,
  setSelectedEventsId,
  setGlobalPageSize,
  clearAllEvents,
} = eventsSlice.actions;
