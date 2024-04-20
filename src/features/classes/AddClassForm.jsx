import { useForm, Controller, useFieldArray } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import StyledSelect from "../../ui/Select";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useStudents } from "../students/useStudents";
import ButtonIcon from "../../ui/ButtonIcon";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useAddClass } from "./useAddClass";
import Empty from "../../ui/Empty";
import FormRowButton from "../../ui/FormRowButton";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import StyledDatePicker from "../../ui/DatePickerStyle";
import StyledDatePickersLayout from "../../ui/DatePickerLayoutStyle";
import StyledTimePicker from "../../ui/TimePickerStyle";
import StyledTimePickersLayout from "../../ui/TimePickerLayoutStyle";

const Stacked = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  padding: 1.5rem 0;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function AddClassForm() {
  const { control, handleSubmit, reset, formState } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "studentFee",
    shouldUnregister: true,
  });

  const { errors } = formState;

  const moveBack = useMoveBack();
  const { students, isLoading: isLoadingStudents } = useStudents();
  const { addClass, isLoading: isAddingClass } = useAddClass();

  if (isLoadingStudents) {
    return <Spinner />;
  }

  if (!students || students.length === 0) {
    return <Empty resourceName="students" />;
  }

  function onSubmit(data) {
    console.log("coming inside onsubmit", data);
    const { date, time, studentFee } = data;

    if (studentFee.length === 0) {
      toast.error("Student and fee details are required for the class");
      return;
    }

    const updatedStudents = studentFee.map(({ studentId, fee }) => ({
      studentId: Number(studentId),
      fee: Number(fee),
    }));

    console.log("date in submit: ", date, dayjs(date).format("MM/DD/YYYY"));
    console.log("time in submit: ", time, dayjs(time).format("hh:mm A"));

    const addClassData = {
      date,
      time,
      studentFee: updatedStudents,
    };

    addClass(addClassData, {
      onSuccess: () => {
        toast.success(`Class added successfully`);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <FormRow label="Time" error={errors?.time?.message}>
          <Controller
            name="time"
            control={control}
            defaultValue={dayjs}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledTimePicker
                  {...field}
                  slots={{ layout: StyledTimePickersLayout }}
                  control={control}
                  renderInput={(params) => <Input {...params} />}
                />
              </LocalizationProvider>
            )}
            rules={{ required: "This field is required" }}
          />
        </FormRow>

        {fields.map((field, index) => (
          <Stacked key={field.id}>
            <Label>Student</Label>
            <Controller
              control={control}
              name={`studentFee.${index}.studentId`}
              render={({ field }) => (
                <>
                  <StyledSelect as="select" {...field}>
                    <option value="">Select</option>{" "}
                    {students.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </StyledSelect>
                  {errors.studentFee?.[index]?.studentId && (
                    <Error>{errors.studentFee[index].studentId.message}</Error>
                  )}
                </>
              )}
              rules={{ required: "Student is required." }}
            />
            <Label>Fee</Label>
            <Controller
              control={control}
              name={`studentFee.${index}.fee`}
              render={({ field }) => (
                <>
                  <Input {...field} type="number" />
                  {errors.studentFee?.[index]?.fee && (
                    <Error>{errors.studentFee[index].fee.message}</Error>
                  )}
                </>
              )}
              rules={{ required: "Fee is required." }}
            />
            <ButtonIcon type="button" onClick={() => remove(index)}>
              <RemoveIcon />
            </ButtonIcon>
          </Stacked>
        ))}

        <Button
          type="button"
          onClick={() => append({ studentId: "", fee: "" })}
        >
          Add Student
        </Button>

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
            //disabled={isLoading}
            onClick={reset}
          >
            Reset
          </Button>
          <Button disabled={isAddingClass}>Create new Class</Button>
        </FormRowButton>
      </Form>
    </>
  );
}
