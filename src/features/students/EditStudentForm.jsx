import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useFamilies } from "./useFamilies";
import Spinner from "../../ui/Spinner";
import { useStudent } from "./useStudent";
import Empty from "../../ui/Empty";
import { useEditStudent } from "./useEditStudent";
import toast from "react-hot-toast";
import { useMoveBack } from "../../hooks/useMoveBack";
import FormRowButton from "../../ui/FormRowButton";

export default function EditStudentForm() {
  const moveBack = useMoveBack();
  // Load student details
  const { student, isLoading } = useStudent();

  // Get families to the dropdown
  const { families, isLoading: isLoadingFamilies } = useFamilies();

  // Edit student mutation
  const { editStudent, isEditing } = useEditStudent();

  // React hook form
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  if (isLoadingFamilies || isLoading) {
    return <Spinner />;
  }

  if (!student) {
    return <Empty resourceName="student" />;
  }

  const { id, name, phone, email, address, familyId } = student;

  function onSubmit({ name, phone, email, address, family }) {
    let familyId;
    if (family !== "Select") {
      familyId = Number(family);
    }
    const newStudent = {
      name,
      phone,
      email,
      address,
      familyId,
    };

    editStudent(
      { newStudent, studentId: id },
      {
        onSuccess: () => {
          toast.success(`${newStudent.name} successfully edited`);
        },
        onError: (err) => {
          reset();
          toast.error(err.message);
        },
      }
    );
  }

  function onError(errors) {
    console.log("error in onerror", errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          defaultValue={name}
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Phone Number" error={errors?.phone?.message}>
        <Input
          type="text"
          id="phone"
          defaultValue={phone}
          disabled={isLoading}
          {...register("phone", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          defaultValue={email}
          disabled={isLoading}
          {...register("email", {
            required: false,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Address" error={errors?.address?.message}>
        <Input
          type="text"
          id="address"
          defaultValue={address}
          disabled={isLoading}
          {...register("address", { required: false })}
        />
      </FormRow>

      <FormRow label="Family" error={errors?.family?.message}>
        <Input
          as="select"
          id="family"
          defaultValue={familyId}
          {...register("family", { required: false })}
        >
          <option value="Select">Select</option>
          {families.map((family) => {
            return (
              <option key={family.id} value={family.id}>
                {family.familyName}
              </option>
            );
          })}
        </Input>
      </FormRow>

      <FormRowButton>
        <Button
          type="button"
          variation="secondary"
          onClick={moveBack}
          size="medium"
        >
          Back
        </Button>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Reset
        </Button>
        <Button disabled={isLoading || isEditing}>Update</Button>
      </FormRowButton>
    </Form>
  );
}
