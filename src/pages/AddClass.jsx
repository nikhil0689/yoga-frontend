import AddClassForm from "../features/classes/AddClassForm";
import Heading from "../ui/Heading";

export default function AddClass() {
  return (
    <>
      <Heading as="h1">Create a new Class</Heading>
      <AddClassForm />
    </>
  );
}
