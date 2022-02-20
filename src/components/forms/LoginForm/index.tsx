import styled from "styled-components";

import { TextInput } from "../TextInput";
import { FormButton } from "../../buttons/FormButton";
import { formStore } from "../../../../lib/formStore";

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

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Hit Magic and get the user object");
  };

  const formValid = emailAddress.valid;

  return (
    <FormContainer>
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
