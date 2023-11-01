import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { DeviceEvent } from "../../types/device-event";

type State = {
  showProcessAlarmModal: boolean;
  showSiteInfoModal: boolean;
  showEventsFilterModal: boolean;
  selectedEvents: DeviceEvent[];
  Events: any[];
  selectedEventsId: any[];
  selectedEventIdsByPage: any[];
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
    setShowSiteInfoModal(state, action: PayloadAction<boolean>) {
      state.showSiteInfoModal = action.payload;
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
      const { pageIndex, selectedRowKeys } = action.payload;
      const finalResult = {
        ...state.selectedEventIdsByPage,
        [pageIndex]: selectedRowKeys,
      };

      state.selectedEventIdsByPage = finalResult;
      const allSelectedItems = [].concat(
        ...Object.values(state.selectedEventIdsByPage),
      );

      state.selectedEventsId = allSelectedItems;
      // const newSelection = selectedRowKeys;
      // console.log(newSelection, "newSelection");
      // newSelection.forEach((item: any) => {
      //   const index = state.selectedEventsId.indexOf(item);
      //   console.log(index, "index");

      //   if (index === -1) {
      //     state.selectedEventsId = [...state.selectedEventsId, item];
      //   }
      // else {
      //   state.selectedEventsId.splice(index, 1);
      //   console.log(state.selectedEventsId.splice(index, 1), "uoooo");
      // }
      // });
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
  setShowSiteInfoModal
} = eventsSlice.actions;
