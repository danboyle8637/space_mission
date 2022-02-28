import { useRouter } from "next/router";
import styled from "styled-components";

import { TextInput } from "../TextInput";
import { FormButton } from "../../buttons/FormButton";
import { formStore } from "../../../../lib/formStore";
import { userStore } from "../../../../lib/userStore";
import { networkStore } from "../../../../lib/networkStore";
import { getErrorMessage } from "../../../utils/utilityFunctions";

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 24px;
  justify-items: center;
  width: 320px;
`;

const ButtonContainer = styled.div`
  width: 175px;
`;

export const LoginForm = () => {
  const setUser = userStore((state) => state.setUser);

  const {
    emailAddress,
    emailAddressOptions,
    updateInputValue,
    updateInputOptions,
  } = formStore((state) => ({
    emailAddress: state.emailAddress,
    emailAddressOptions: state.emailAddressOptions,
    updateInputValue: state.updateInputValue,
    updateInputOptions: state.updateInputOptions,
  }));

  const { setErrorMessage, toggleErrorToaster } = networkStore((state) => ({
    toggleErrorToaster: state.toggleErrorToaster,
    setErrorMessage: state.setErrorMessage,
  }));

  const { push } = useRouter();

  const formValid = emailAddress.valid;

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const expireDate = new Date(`${month}/${day}/${year}`);

    const body = {
      emailAddress: emailAddress.value,
      date: `${expireDate}`,
    };

    try {
      const logUserIn = async () => {
        const res = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(body),
        });

        const data = await res.json();
        setUser(data.userDoc);

        debugger;

        if (data) {
          push("/dashboard");
        }
      };

      if (formValid) {
        logUserIn();
      }
    } catch (error) {
      setErrorMessage("Login Call Error", getErrorMessage(error));
      toggleErrorToaster();
    }
  };

  return (
    <FormContainer onSubmit={handleLogin}>
      <TextInput
        inputType="text"
        inputName="emailAddress"
        labelFor="emailAddress"
        labelName="Email Address"
        placeholder="Enter your email to login..."
        value={emailAddress.value}
        valid={emailAddress.valid}
        initial={emailAddressOptions.initial}
        touched={emailAddressOptions.touched}
        updateInputValue={updateInputValue}
        updateInputOptions={updateInputOptions}
      />
      <ButtonContainer>
        <FormButton isValid={formValid}>Login</FormButton>
      </ButtonContainer>
    </FormContainer>
  );
};
