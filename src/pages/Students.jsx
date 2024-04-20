import { useNavigate } from "react-router-dom";
import StudentsTable from "../features/students/StudentsTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Students() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Students</Heading>
        <Button
          variation="primary"
          size="medium"
          onClick={() => navigate("/students/addStudent")}
        >
          Add Student
        </Button>
      </Row>

      <Row>
        <StudentsTable />
      </Row>
    </>
  );
}
