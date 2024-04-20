import { NavLink } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ClassIcon from "@mui/icons-material/Class";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import PaidIcon from "@mui/icons-material/Paid";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

export default function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/home">
            <HomeIcon />
            Home
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/students">
            <PeopleAltSharpIcon />
            Students
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/classes">
            <ClassIcon /> Classes
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/payments">
            <PaidIcon />
            Payments
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
