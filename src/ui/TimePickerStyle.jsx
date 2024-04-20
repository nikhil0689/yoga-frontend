import { MobileTimePicker } from "@mui/x-date-pickers";
import styled from "styled-components";

export const StyledTimePicker = styled(MobileTimePicker)`
  .MuiInputBase-root {
    font-size: 1.4rem;
  }

  .MuiOutlinedInput-root {
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    color: var(--color-grey-700);
  }
`;

export default StyledTimePicker;
