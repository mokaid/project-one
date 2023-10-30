import { RootState } from "../../types/store";

const getEventsState = (state: RootState) => state.events;

export const getShowProcessAlarmModalState = (state: RootState) =>
  getEventsState(state).showProcessAlarmModal;

export const getShowEventsFilterModalState = (state: RootState) =>
  getEventsState(state).showEventsFilterModal;

export const getSelectedEvents = (state: RootState) =>
  getEventsState(state).selectedEvents;

export const getEvents = (state: RootState) =>
  getEventsState(state).Events;

export const getSelectedRowIds = (state: RootState) =>
  getEventsState(state).selectedEventsId;
