import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useFamilies } from "./useFamilies";
import Spinner from "../../ui/Spinner";
import StyledSelect from "../../ui/Select";
import { useAddStudent } from "./useAddStudent";
import toast from "react-hot-toast";
import { useMoveBack } from "../../hooks/useMoveBack";
import FormRowButton from "../../ui/FormRowButton";

export default function AddStudentForm() {
  const moveBack = useMoveBack();
  const { families, isLoading: isLoadingFamilies } = useFamilies();
  const { addStudent, isLoading: isAddingStudent } = useAddStudent();
  const { register, formState, handleSubmit, reset, getValues, clearErrors } =
    useForm();
  const { errors } = formState;
  const isLoading = false;

  if (isLoadingFamilies) {
    return <Spinner />;
  }

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

    addStudent(newStudent, {
      onSuccess: () => {
        toast.success(`${newStudent.name} successfully added`);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  const isPhoneRequired = (family) => {
    console.log("coming here: ", family);
    // Check if "familyId" is empty or "Select"
    return !family || family === "Select";
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Full name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isLoading}
            {...register("name", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Phone Number" error={errors?.phone?.message}>
          <Input
            type="number"
            id="phone"
            disabled={isLoading}
            {...register("phone", {
              minLength: { value: 10, message: "Invalid Phone no." },
              maxLength: { value: 10, message: "Invalid Phone no." },
              validate: {
                required: (value) => {
                  if (!value && isPhoneRequired(getValues("family")))
                    return "Required when family is not selected.";
                  return true;
                },
              },
            })}
          />
        </FormRow>

        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
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
            disabled={isLoading}
            {...register("address", { required: false })}
          />
        </FormRow>

        <FormRow label="Family" error={errors?.family?.message}>
          <StyledSelect
            as="select"
            id="family"
            defaultValue="None"
            onChange={() => clearErrors()}
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
          </StyledSelect>
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
          <Button disabled={isLoading || isAddingStudent}>
            Create new user
          </Button>
        </FormRowButton>
      </Form>
    </>
  );
}
