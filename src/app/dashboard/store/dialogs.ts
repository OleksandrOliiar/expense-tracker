import { create } from "zustand";

type State = {
  subscribeDialogOpen: boolean;
  changePlanDialogOpen: boolean;
};

type Action = {
  setSubscribeDialogOpen: (open: boolean) => void;
  setChangePlanDialogOpen: (open: boolean) => void;
};

export const useDialogs = create<State & Action>()((set) => ({
  subscribeDialogOpen: false,
  changePlanDialogOpen: false,
  setSubscribeDialogOpen: (open) => set({ subscribeDialogOpen: open }),
  setChangePlanDialogOpen: (open) => set({ changePlanDialogOpen: open }),
}));

export const selectSubscribeDialogOpen = (state: State) =>
  state.subscribeDialogOpen;
export const selectChangePlanDialogOpen = (state: State) =>
  state.changePlanDialogOpen;

export const selectSetSubscribeDialogOpen = (action: Action) =>
  action.setSubscribeDialogOpen;
export const selectSetChangePlanDialogOpen = (action: Action) =>
  action.setChangePlanDialogOpen;
