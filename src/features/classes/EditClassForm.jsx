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
import { useClass } from "./useClass";
import Empty from "../../ui/Empty";
import { useEffect, useState } from "react";
import { useEditClass } from "./useEditClass";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteClass } from "./useDeleteClass";
import { useNavigate } from "react-router-dom";
import FormRowButton from "../../ui/FormRowButton";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import StyledDatePicker from "../../ui/DatePickerStyle";
import StyledDatePickersLayout from "../../ui/DatePickerLayoutStyle";
import StyledTimePicker from "../../ui/TimePickerStyle";

const Stacked = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  padding: 1.5rem 0;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2.2rem;
  justify-content: start;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function EditClassForm() {
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);
  const { students: studentsDropDown, isLoading: isLoadingStudents } =
    useStudents();
  const { classDetails, isLoading: isLoadingClass, error } = useClass();

  const { deleteClass, isDeleting } = useDeleteClass();

  // React hook form
  const { control, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const { isLoading: isEditing, editClass } = useEditClass();

  const moveBack = useMoveBack();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "studentFee",
    shouldUnregister: true,
  });

  useEffect(() => {
    if (!initialized && classDetails && classDetails.students) {
      const defaultStudents = classDetails.students.map((student) => ({
        studentId: student.studentId,
        fee: student.fee,
      }));

      defaultStudents.forEach((student) => append(student));
      setInitialized(true);
    }
  }, [classDetails, append, initialized, fields]);

  if (isLoadingClass || isLoadingStudents) {
    return <Spinner />;
  }

  if (!classDetails || error) {
    toast.error(error.message);
    return <Empty resourceName="Class details" />;
  }

  const { classId, date: currentDate, time: currentTime } = classDetails;

  function onSubmit(data) {
    const { date, time, studentFee } = data;

    if (studentFee.length === 0) {
      toast.error("Student and fee details are required for the class");
      return;
    }

    // Remove 'studentName' property from each student object
    const updatedStudents = studentFee.map(({ studentId, fee }) => ({
      studentId: Number(studentId),
      fee: Number(fee),
    }));

    const editClassData = {
      date,
      time,
      studentFee: updatedStudents,
    };

    editClass(
      { classDetails: editClassData, classId },
      {
        onSuccess: () => {
          toast.success(`Class ${classId} successfully edited`);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Date" error={errors?.date?.message}>
          <Controller
            name="date"
            control={control}
            defaultValue={dayjs(new Date(currentDate))}
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
            defaultValue={dayjs(currentTime)}
            render={({ field }) => (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="us"
              >
                <StyledTimePicker
                  {...field}
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
                    <option value="">Select</option>
                    {studentsDropDown.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
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
          disabled={isEditing}
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
            Cancel
          </Button>
          <Button disabled={isEditing}>Edit Class</Button>
        </FormRowButton>
      </Form>

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" disabled={isDeleting} type="button">
              Delete Class Permanently
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="class"
              disabled={isDeleting}
              onConfirm={() =>
                deleteClass(classId, {
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
