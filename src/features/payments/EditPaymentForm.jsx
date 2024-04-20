import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import toast from "react-hot-toast";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useFamilies } from "../students/useFamilies";
import { usePayment } from "./usePayment";
import { useEditPayment } from "./useEditPayment";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeletePayment } from "./useDeletePayment";
import { useNavigate } from "react-router-dom";
import FormRowButton from "../../ui/FormRowButton";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import StyledDatePicker from "../../ui/DatePickerStyle";
import StyledDatePickersLayout from "../../ui/DatePickerLayoutStyle";

const ButtonGroup = styled.div`
  display: flex;
  gap: 2.2rem;
  justify-content: start;
`;

export default function EditPaymentForm() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  // Get families to the dropdown
  const { families, isLoading: isLoadingFamilies } = useFamilies();

  const { payment, isLoading } = usePayment();

  const { editPayment, isLoading: isEditing } = useEditPayment();

  const { isDeleting, deletePayment } = useDeletePayment();

  // React hook form
  const { register, formState, handleSubmit, reset, control } = useForm({
    shouldUnregister: true,
  });
  const { errors } = formState;

  if (isLoadingFamilies || isLoading) {
    return <Spinner />;
  }

  if (!payment) {
    return <Empty resourceName="payment" />;
  }

  const { id: paymentId, date, payment: amount, student } = payment;

  function onSubmit({ studentFamily, amount, date }) {
    if (studentFamily === "Select") {
      toast.error(
        "Student Family detail is cannot be empty, resetting the form"
      );
      reset();
      return;
    }

    const editedPayment = {
      studentId: Number(studentFamily),
      date,
      payment: Number(amount),
    };

    editPayment(
      { editedPayment, paymentId },
      {
        onSuccess: () => {
          toast.success(`Payment ${paymentId} successfully edited`);
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
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Family" error={errors?.studentFamily?.message}>
          <Input
            as="select"
            id="studentFamily"
            defaultValue={student.props.id}
            {...register("studentFamily", { required: true })}
          >
            <option value="Select">Select</option>
            {families.map((family) => {
              return (
                <option key={family.ownerId} value={family.ownerId}>
                  {family.familyName}
                </option>
              );
            })}
          </Input>
        </FormRow>

        <FormRow label="Amount" error={errors?.amount?.message}>
          <Input
            type="text"
            id="amount"
            defaultValue={amount}
            disabled={isLoading}
            {...register("amount", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Date" error={errors?.date?.message}>
          <Controller
            name="date"
            control={control}
            defaultValue={dayjs(new Date(date))}
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
          <Button disabled={isLoading || isEditing}>Update Payment</Button>
        </FormRowButton>
      </Form>

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" disabled={isDeleting} type="button">
              Delete Payment Permanently
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="Payment"
              disabled={isDeleting}
              onConfirm={() =>
                deletePayment(paymentId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}
