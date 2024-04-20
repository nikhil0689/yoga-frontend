import EditStudentForm from "../features/students/EditStudentForm";
import Heading from "../ui/Heading";

export default function EditStudent() {
  return (
    <>
      <Heading as="h1">Edit Student Details</Heading>
      <EditStudentForm />
    </>
  );
}
