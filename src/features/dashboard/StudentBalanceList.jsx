import styled from "styled-components";
import { useFamilies } from "../students/useFamilies";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import StudentBalanceItem from "./StudentBalanceItem";

const StyledBalanceTable = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const BalanceList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

export default function StudentBalanceList() {
  const { families, isLoading } = useFamilies();

  if (isLoading) {
    return <Spinner />;
  }

  if (!families) {
    return <Empty resourceName="balance" />;
  }

  const removeZeroBalanceItems = families.filter((e) => e.balance !== 0);

  return (
    <StyledBalanceTable>
      <Row type="horizontal">
        <Heading as="h2">Balances</Heading>
      </Row>

      {!isLoading ? (
        removeZeroBalanceItems?.length > 0 ? (
          <BalanceList>
            {removeZeroBalanceItems.map((family) => (
              <StudentBalanceItem family={family} key={family.id} />
            ))}
          </BalanceList>
        ) : (
          <NoActivity>No balances...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledBalanceTable>
  );
}
