// TextInput.jsx
import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  color: ${({ theme }) => theme.text_primary};
  padding: 0px 4px;
  ${({ error, theme }) => error && `color: ${theme.red};`}
  ${({ small }) => small && `font-size: 8px;`}
  ${({ popup, theme }) =>
    popup && `color: ${theme.popup_text_secondary};`}
`;

const OutlinedInput = styled.div`
  border-radius: 8px;
  border: 0.5px solid ${({ theme }) => theme.text_secondary};
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  &:focus-within {
    border-color: ${({ theme }) => theme.secondary};
  }

  ${({ error, theme }) => error && `border-color: ${theme.red};`}
  ${({ chipableInput, height, theme }) =>
    chipableInput &&
    `
      background: ${theme.card};
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      min-height: ${height};
    `}
  ${({ small }) =>
    small &&
    `
      border-radius: 6px;
      padding: 8px 10px;
    `}
  ${({ popup, theme }) =>
    popup &&
    `
      color: ${theme.popup_text_secondary};
      border: 0.5px solid ${theme.popup_text_secondary + 60};
    `}
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text_primary};

  ${({ small }) => small && `font-size: 12px;`}
  ${({ popup, theme }) => popup && `color: ${theme.popup_text_secondary};`}
`;

const Error = styled.p`
  font-size: 12px;
  margin: 0px 4px;
  color: ${({ theme }) => theme.red};
  ${({ small }) => small && `font-size: 8px;`}
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Chip = styled.div`
  padding: 5px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary + 10};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  onChange,
  textArea,
  rows,
  columns,
  chipableInput,
  chipableArray = [],
  removeChip,
  height,
  small,
  popup,
  password,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = password && !showPassword ? "password" : "text";

  return (
    <Container small={small}>
      <Label small={small} popup={popup} error={error}>
        {label}
      </Label>

      <OutlinedInput
        small={small}
        popup={popup}
        error={error}
        chipableInput={chipableInput}
        height={height}
      >
        {chipableInput ? (
          <ChipWrapper>
            {chipableArray.map((chip, index) => (
              <Chip key={index}>
                <span>{chip}</span>
                <CloseRounded
                  sx={{ fontSize: "14px" }}
                  onClick={() => removeChip(name, index)}
                />
              </Chip>
            ))}
            <Input
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
            />
          </ChipWrapper>
        ) : (
          <>
            <Input
              as={textArea ? "textarea" : "input"}
              name={name}
              rows={rows}
              columns={columns}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              type={password ? inputType : "text"}
              small={small}
              popup={popup}
            />
            {password &&
              (showPassword ? (
                <Visibility
                  onClick={() => setShowPassword(false)}
                  aria-label="Hide password"
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <VisibilityOff
                  onClick={() => setShowPassword(true)}
                  aria-label="Show password"
                  style={{ cursor: "pointer" }}
                />
              ))}
          </>
        )}
      </OutlinedInput>

      {error && (
        <Error small={small} popup={popup}>
          {error}
        </Error>
      )}
    </Container>
  );
};

export default TextInput;
