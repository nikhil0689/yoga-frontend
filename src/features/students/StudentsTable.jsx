import toast from "react-hot-toast";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import StudentRow from "./StudentRow";
import { useStudents } from "./useStudents";
import Pagination from "../../ui/Pagination";

export default function StudentsTable() {
  const { students, isLoading, error, count } = useStudents();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error.message);
    console.log("error in students page: ", error);
  }

  if (!students || students.length === 0) {
    return <Empty resourceName="Students" />;
  }

  return (
    <>
      <Table columns="2fr 2fr 4fr 4fr 2fr 4rem">
        <Table.Header>
          <div>Name</div>
          <div>Phone</div>
          <div>Email</div>
          <div>Address</div>
          <div>Family</div>
        </Table.Header>

        <Table.Body
          data={students}
          render={(student) => (
            <StudentRow key={student.id} student={student} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </>
  );
}
