import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const ListContainer = styled.div`
  padding: 1rem;
  border-radius: 8px;
`;

const ListItem = styled.div`
  padding: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 5rem;
`;

const Name = styled.span`
  font-weight: 500;
`;

function StudentBalanceItem({ family }) {
  const { id, familyName, balance } = family;

  return (
    <ListContainer>
      <ListItem key={id}>
        <Name>{familyName}</Name>
        <Name>{formatCurrency(balance)}</Name>
      </ListItem>
    </ListContainer>
  );
}

export default StudentBalanceItem;
