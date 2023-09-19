import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { DeviceEvent } from "../../types/device-event";

type State = {
  showProcessAlarmModal: boolean;
  showEventsFilterModal: boolean;
  selectedEvents: DeviceEvent[];
};

const initialState: State = {
  showProcessAlarmModal: false,
  showEventsFilterModal: false,
  selectedEvents: [],
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
  },
});

export const events = eventsSlice.reducer;

export const {
  setShowProcesslarmModal,
  setShowEventsFilterModal,
  setSelectedEvents,
} = eventsSlice.actions;
