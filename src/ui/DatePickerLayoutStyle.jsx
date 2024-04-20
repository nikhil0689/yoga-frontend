import { PickersLayout } from "@mui/x-date-pickers";
import styled from "styled-components";

const StyledDatePickersLayout = styled(PickersLayout)`
  .MuiTypography-root {
    font-size: 1.5rem;
    color: var(--color-grey-700);
  }

  .MuiButtonBase-root {
    font-size: 1.5rem;
    color: var(--color-grey-700);
  }

  .MuiPickersCalendarHeader-label {
    font-size: 1.5rem;
    color: var(--color-grey-700);
  }

  .MuiPickersYear-yearButton {
    font-size: 1.5rem;
    color: var(--color-grey-700);
  }

  .MuiDateCalendar-root {
    background-color: var(--color-grey-0);
  }
`;

export default StyledDatePickersLayout;
