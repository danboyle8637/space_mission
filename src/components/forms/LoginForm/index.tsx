import { useRouter } from "next/router";
import styled from "styled-components";

import { TextInput } from "../TextInput";
import { FormButton } from "../../buttons/FormButton";
import { formStore } from "../../../../lib/formStore";
import { userStore } from "../../../../lib/userStore";

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

  const { push } = useRouter();

  const formValid = emailAddress.valid;

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const date = new Date("3/12/2022");

    const body = {
      emailAddress: emailAddress.value,
      date: `${date}`,
    };

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
