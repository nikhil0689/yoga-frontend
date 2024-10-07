import Row from "../ui/Row";
import StudentClassesTable from "../features/classes/StudentClassesTable";
import Button from "../ui/Button";
import { useMoveBack } from "../hooks/useMoveBack";
import { ButtonGroup } from "@mui/material";

export default function StudentClasses() {
  const moveBack = useMoveBack();
  return (
    <>
      <Row>
        <StudentClassesTable />
      </Row>
      <ButtonGroup>
        <Button
          type="button"
          variation="primary"
          onClick={moveBack}
          size="medium"
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}
