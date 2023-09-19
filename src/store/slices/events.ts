import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { DeviceEvent } from "../../types/device-event";

type State = {
  showEventsFilterModal: boolean;
  selectedEvent: DeviceEvent | null;
};

const initialState: State = {
  showEventsFilterModal: false,
  selectedEvent: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setShowEventsFilterModal(state, action: PayloadAction<boolean>) {
      state.showEventsFilterModal = action.payload;
    },
    setSelectedEvent(state, action: PayloadAction<DeviceEvent | null>) {
      state.selectedEvent = action.payload;
    },
  },
});

export const events = eventsSlice.reducer;

export const { setShowEventsFilterModal, setSelectedEvent } =
  eventsSlice.actions;
