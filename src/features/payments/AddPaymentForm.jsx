import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import Spinner from "../../ui/Spinner";
import StyledSelect from "../../ui/Select";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useFamilies } from "../students/useFamilies";
import toast from "react-hot-toast";
import { useAddPayment } from "./useAddPayment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormRowButton from "../../ui/FormRowButton";
import StyledDatePicker from "../../ui/DatePickerStyle";
import StyledDatePickersLayout from "../../ui/DatePickerLayoutStyle";

export default function AddPaymentForm2() {
  const moveBack = useMoveBack();
  const { families, isLoading: isLoadingFamilies } = useFamilies();
  const { addPayment, isLoading: isAddingPayment } = useAddPayment();
  const { register, formState, handleSubmit, reset, control } = useForm();
  const { errors } = formState;
  const isLoading = false;

  if (isLoadingFamilies) {
    return <Spinner />;
  }

  function onSubmit({ studentId, payment, date }) {
    if (studentId === "Select") {
      toast.error("Student Family detail is required");
      return;
    }

    const paymentData = {
      studentId: Number(studentId),
      payment: Number(payment),
      date,
    };

    addPayment(paymentData, {
      onSuccess: () => {
        toast.success(`Payment added successfully`);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Student Family" error={errors?.studentId?.message}>
          <StyledSelect
            as="select"
            id="family"
            {...register("studentId", { required: true })}
          >
            <option value="Select">Select</option>
            {families.map((family) => {
              return (
                <option key={family.ownerId} value={family.ownerId}>
                  {family.familyName}
                </option>
              );
            })}
          </StyledSelect>
        </FormRow>

        <FormRow label="Date" error={errors?.date?.message}>
          <Controller
            name="date"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker
                  slots={{ layout: StyledDatePickersLayout }}
                  {...field}
                  control={control}
                  renderInput={(params) => <Input {...params} />}
                  inputFormat="MM/dd/yyyy"
                />
              </LocalizationProvider>
            )}
            rules={{ required: "This field is required" }}
          />
        </FormRow>

        <FormRow label="Amount" error={errors?.payment?.message}>
          <Input
            type="number"
            id="payment"
            disabled={isLoading}
            {...register("payment", { required: "This field is required" })}
          />
        </FormRow>

        {/* <FormRow label="Date" error={errors?.date?.message}>
          <Input
            type="text"
            id="date"
            disabled={isLoading}
            {...register("date", { required: "This field is required" })}
          />
        </FormRow> */}

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
          <Button disabled={isLoading || isAddingPayment}>Add Payment</Button>
        </FormRowButton>
      </Form>
    </>
  );
}
