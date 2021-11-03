import create from "zustand";

interface TempStore {
  locationTaskFirstUpdateRequested: boolean;
  locationTaskOnStartApplicationDefined: boolean;
  createPositionRequestWasSent: boolean;

  setLocationTaskFirstUpdateRequested(): void;
  setLocationTaskOnStartApplicationDefined(): void;
  setCreatePositionRequestWasSent(): void;
}

export const useTempStore = create<TempStore>((set) => ({
  locationTaskFirstUpdateRequested: false,
  locationTaskOnStartApplicationDefined: false,
  setLocationTaskFirstUpdateRequested: () =>
    set(() => ({ locationTaskFirstUpdateRequested: true })),
  setLocationTaskOnStartApplicationDefined: () =>
    set(() => ({ locationTaskOnStartApplicationDefined: true })),
  createPositionRequestWasSent: false,
  setCreatePositionRequestWasSent: () =>
    set(() => ({ createPositionRequestWasSent: true })),
}));
