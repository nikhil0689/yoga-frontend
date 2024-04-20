import styled from "styled-components";

const StyledButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

export default function FormRowButton({ children }) {
  return (
    <div>
      <StyledButtons>{children}</StyledButtons>
    </div>
  );
}
