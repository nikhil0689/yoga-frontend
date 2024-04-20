import AddStudentForm from "../features/students/AddStudentForm";
import Heading from "../ui/Heading";

export default function AddStudent() {
  return (
    <>
      <Heading as="h1">Create a new Student</Heading>
      <AddStudentForm />
    </>
  );
}
