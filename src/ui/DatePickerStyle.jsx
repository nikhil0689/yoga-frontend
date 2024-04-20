import { DatePicker } from "@mui/x-date-pickers";
import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)`
  .MuiInputBase-root {
    font-size: 1.4rem;
  }

  .MuiIconButton-root {
    background-color: var(--color-brand-600);
  }

  .MuiSvgIcon-root {
    color: var(--color-brand-50);
  }

  .MuiOutlinedInput-root {
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    color: var(--color-grey-700);
  }
`;

export default StyledDatePicker;
