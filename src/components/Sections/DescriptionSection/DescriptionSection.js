import styled from "styled-components";
import { TextField } from "@material-ui/core";

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

export const DescriptionSection = ({ setFirstParagraph, setSecondParagraph }) => {
  const handleFirstParagraphChange = (e) => {
    setFirstParagraph(e.target.value.trim());
  };

  const handleSecondParagraphChange = (e) => {
    setSecondParagraph(e.target.value.trim());
  };

  return (
    <>
      <StyledTextField
        onChange={handleFirstParagraphChange}
        multiline
        rows={10}
        label="Opis akapin nr 1"
        variant="outlined"
      />
      <StyledTextField
        onChange={handleSecondParagraphChange}
        multiline
        rows={10}
        label="Opis akapin nr 2"
        variant="outlined"
      />
    </>
  );
};