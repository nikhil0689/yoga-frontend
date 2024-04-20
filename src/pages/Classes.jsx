import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ClassesTable from "../features/classes/ClassesTable";

export default function Classes() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Classes</Heading>
        <Button onClick={() => navigate("/classes/addClass")}>Add Class</Button>
      </Row>

      <Row>
        <ClassesTable />
      </Row>
    </>
  );
}
