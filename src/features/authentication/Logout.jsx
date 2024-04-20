import LogoutIcon from "@mui/icons-material/Logout";
import ButtonIcon from "../../ui/ButtonIcon";
import Spinner from "../../ui/Spinner";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <LogoutIcon /> : <Spinner />}
    </ButtonIcon>
  );
}

export default Logout;
