import toast from "react-hot-toast";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useClasses } from "./useClasses";
import ClassRow from "./ClassRow";
import Pagination from "../../ui/Pagination";

export default function ClassesTable() {
  const { classes, isLoading, error, count } = useClasses();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    toast.error(error.message);
    console.log("error in classes page: ", error);
  }

  if (!classes || classes.length === 0) {
    return <Empty resourceName="Classes" />;
  }

  return (
    <Table columns="1fr 2fr 2fr 3fr 1fr 4rem">
      <Table.Header>
        <div>Class ID</div>
        <div>Date</div>
        <div>Time</div>
        <div>Students</div>
        <div>Fee</div>
      </Table.Header>

      <Table.Body
        data={classes}
        render={(classData) => (
          <ClassRow key={classData.classId} classData={classData} />
        )}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}
