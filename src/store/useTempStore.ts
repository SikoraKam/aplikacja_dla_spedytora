import create, { SetState } from "zustand";

interface TempStore {
  locationTaskFirstUpdateRequested: boolean;
  locationTaskOnStartApplicationDefined: boolean;
  createPositionRequestWasSent: boolean;

  setLocationTaskFirstUpdateRequested(): void;
  setLocationTaskOnStartApplicationDefined(): void;
  setCreatePositionRequestWasSent(): void;
  reset(): void;
}

const getInitialState = (set: SetState<TempStore>) => ({
  locationTaskFirstUpdateRequested: false,
  locationTaskOnStartApplicationDefined: false,
  createPositionRequestWasSent: false,
  setLocationTaskFirstUpdateRequested: () =>
    set(() => ({ locationTaskFirstUpdateRequested: true })),
  setLocationTaskOnStartApplicationDefined: () =>
    set(() => ({ locationTaskOnStartApplicationDefined: true })),
  setCreatePositionRequestWasSent: () =>
    set(() => ({ createPositionRequestWasSent: true })),
});

export const useTempStore = create<TempStore>((set) => ({
  ...getInitialState(set),
  reset: () => set(() => getInitialState(set)),
}));
