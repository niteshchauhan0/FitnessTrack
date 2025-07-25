import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";

// Styled Card container
const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + "20"};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + "15"};
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.cardBackground || "#fff"};

  @media (max-width: 600px) {
    padding: 16px;
    gap: 12px;
  }
`;

// Styled title
const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  return (
    <Card>
      <Title>Add New Workout</Title>
      <TextInput
        label="Workout"
        textArea
        rows={10}
        placeholder={`Enter in this format:\n\n#Category\n- Workout Name\n- Sets\n- Reps\n- Weight\n- Duration`}
        value={workout}
        handleChange={(e) => setWorkout(e.target.value)} // ✅ Corrected typo from `handelChange`
      />
      <Button
        text="Add Workout"
        small
        onClick={addNewWorkout}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </Card>
  );
};

export default AddWorkout;
