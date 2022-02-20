import React from "react";
import create, { SetState } from "zustand";

interface InputValue {
  value: string;
  valid: boolean;
}

interface InputOptions {
  initial: boolean;
  touched: boolean;
}

type FormState = {
  emailAddress: InputValue;
  emailAddressOptions: InputOptions;
  callsign: InputValue;
  callsignOptions: InputOptions;
  avatarImage: InputValue;
  updateInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateInputOptions: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const formStore = create<FormState>((set: SetState<FormState>) => ({
  emailAddress: {
    value: "",
    valid: false,
  },
  emailAddressOptions: {
    initial: true,
    touched: false,
  },
  callsign: {
    value: "",
    valid: false,
  },
  callsignOptions: {
    initial: true,
    touched: false,
  },
  avatarImage: {
    value: "",
    valid: false,
  },
  updateInputValue: (event) =>
    set((state) => {
      const name = event.target.name;
      const value = event.target.value;

      switch (name) {
        case "emailAddress": {
          const data = value.toLowerCase();
          const valid = data.length > 0;
          return {
            ...state,
            emailAddress: {
              value: data,
              valid: valid,
            },
          };
        }
        case "callsign": {
          const data = value.toLowerCase();
          const valid = value.length > 0;
          return {
            ...state,
            callsign: {
              value: data,
              valid: valid,
            },
          };
        }
        case "avatarImage": {
          return {
            ...state,
            avatarImage: {
              value: value,
              valid: true,
            },
          };
        }
        default: {
          return state;
        }
      }
    }),
  updateInputOptions: (event) =>
    set((state) => {
      const name = event.target.name;

      switch (name) {
        case "emailAddress": {
          return {
            ...state,
            emailAddressOptions: {
              initial: false,
              touched: !state.emailAddressOptions.touched,
            },
          };
        }
        case "callsign": {
          return {
            ...state,
            callsignOptions: {
              initial: false,
              touched: !state.callsignOptions.touched,
            },
          };
        }
        case "avatarImage": {
          return {
            ...state,
          };
        }
        default: {
          return state;
        }
      }
    }),
}));
