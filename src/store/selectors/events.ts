import { RootState } from "../../types/store";

const getEventsState = (state: RootState) => state.events;

export const getShowEventsFilterModalState = (state: RootState) =>
  getEventsState(state).showEventsFilterModal;
