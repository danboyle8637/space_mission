import create, { SetState } from "zustand";

type NetworkState = {
  isErrorToasterOpen: boolean;
  errorHeadline: string;
  errorMessage: string;
  setErrorMessage: (headline: string, message: string) => void;
  toggleErrorToaster: () => void;
  closeErrorToaster: () => void;
};

export const networkStore = create<NetworkState>(
  (set: SetState<NetworkState>) => ({
    isErrorToasterOpen: false,
    errorHeadline: "",
    errorMessage: "",
    setErrorMessage: (headline, message) =>
      set((state) => {
        return {
          ...state,
          errorHeadline: headline,
          errorMessage: message,
        };
      }),
    toggleErrorToaster: () =>
      set((state) => ({
        ...state,
        isErrorToasterOpen: !state.isErrorToasterOpen,
      })),
    closeErrorToaster: () =>
      set((state) => ({
        ...state,
        isErrorToasterOpen: false,
      })),
  })
);
