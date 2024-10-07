import toast from "react-hot-toast";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";
import { useStudentClasses } from "./useStudentClasses";
import StudentClassRow from "./StudentClassRow";
import Heading from "../../ui/Heading";

export default function StudentClassesTable() {
  const { studentClasses, isLoading, error, count } = useStudentClasses();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error.message);
    console.log("error in studentClasses page: ", error);
  }

  if (!studentClasses || studentClasses.length === 0) {
    return <Empty resourceName="Classes" />;
  }

  console.log("studentClasses: ", studentClasses);

  return (
    <>
      <Heading as="h1">
        {studentClasses[0].student.props.name} Class Details
      </Heading>
      <Table columns="1fr 1fr 1fr 1fr 1rem">
        <Table.Header>
          <div>Class ID</div>
          <div>Date</div>
          <div>Time</div>
          <div>Fee</div>
        </Table.Header>

        <Table.Body
          data={studentClasses}
          render={(studentClassData) => (
            <StudentClassRow
              key={studentClassData.classId}
              studentClassData={studentClassData}
            />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </>
  );
}
