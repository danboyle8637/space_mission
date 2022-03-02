import { useEffect, useRef } from "react";
import styled from "styled-components";
import { animate } from "motion";

interface UnderlineInput1Props {
  inputType: string;
  inputName: string;
  labelName: string;
  labelFor: string;
  labelError?: string;
  labelInstructions?: string;
  placeholder: string;
  value: string;
  valid: boolean;
  initial: boolean;
  touched: boolean;
  updateInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateInputOptions: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content;
  gap: 0;
  width: 100%;
  max-width: 500px;
  height: 68px;
  box-shadow: 0 2px 8px 2px hsla(0, 0%, 0%, 0.3);
  overflow: hidden;
`;

const InputLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--input-label-color);
  transform: translateX(24px);
`;

const InputField = styled.input`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  margin: 0;
  padding: 12px;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--input-text-color);
  background: var(--input-background);
  border: none;
  width: 100%;
  outline: none;
  caret-color: var(--input-caret);
  &::placeholder {
    font-size: 1.6rem;
    color: var(--input-placeholder-color);
  }
`;

const InputUnderlineContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 6px;
`;

const InputBaseUnderline = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: var(--base-underline-color);
  width: 100%;
  height: 100%;
`;

const InputIndicatorUnderline = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: var(--indicator-underline-color);
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  transition: background-color 300ms ease-in-out;
  pointer-events: none;
`;

const InputMessage = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 15px;
  font-weight: 500;
  color: var(--input-label-color);
  transform: translateY(-14px);
`;

export const TextInput: React.FC<UnderlineInput1Props> = ({
  inputType,
  inputName,
  labelName,
  labelFor,
  placeholder,
  value,
  valid,
  initial,
  touched,
  updateInputValue,
  updateInputOptions,
}) => {
  const underlineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const underline = underlineRef.current;

    if (underline && touched) {
      // Animate it in...
      animate(
        underline,
        {
          transform: "translateX(0%)",
        },
        {
          duration: 1,
        }
      );
    }
  }, [touched]);

  const styles = {
    "--input-label-color": "#f8f8f8",
    "--input-text-color": "var(--accent-purple)",
    "--input-background": "#313056",
    "--input-caret": "var(--accent-teal)",
    "--input-placeholder-color": "var(--accent-purple)",
    "--base-underline-color": "#14141F",
    "--indicator-underline-color": touched
      ? "var(--accent-pink)"
      : !valid && !touched && !initial
      ? "#E03030"
      : valid && !touched
      ? "var(--accent-teal)"
      : "#14141F",
  } as React.CSSProperties;

  return (
    <InputContainer style={styles}>
      <InputField
        type={inputType}
        id={inputName}
        autoComplete="off"
        name={inputName}
        placeholder={placeholder}
        value={value}
        onChange={updateInputValue}
        onFocus={updateInputOptions}
        onBlur={updateInputOptions}
      />
      <InputUnderlineContainer>
        <InputBaseUnderline />
        <InputIndicatorUnderline ref={underlineRef} />
      </InputUnderlineContainer>
    </InputContainer>
  );
};
