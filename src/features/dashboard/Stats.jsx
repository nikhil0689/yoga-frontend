import Stat from "./Stat";
import GroupIcon from "@mui/icons-material/Group";
import ClassIcon from "@mui/icons-material/Class";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BalanceIcon from "@mui/icons-material/Balance";
import { formatCurrency } from "../../utils/helpers";

function Stats({ dashboardStats }) {
  const { students, classes, payments, balance } = dashboardStats;
  return (
    <>
      <Stat
        title="Students"
        color="blue"
        icon={<GroupIcon />}
        value={students}
      />
      <Stat
        title="Classes"
        color="green"
        icon={<ClassIcon />}
        value={classes}
      />
      <Stat
        title="Income"
        color="indigo"
        icon={<AttachMoneyIcon />}
        value={formatCurrency(payments)}
      />
      <Stat
        title="Payments Remaining"
        color="yellow"
        icon={<BalanceIcon />}
        value={formatCurrency(balance)}
      />
    </>
  );
}

export default Stats;
