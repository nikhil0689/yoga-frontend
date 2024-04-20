import LightModeIcon from "@mui/icons-material/LightMode";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
