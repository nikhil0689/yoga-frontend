import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 10rem;
  width: 12rem;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo_white.png" : "/logo_black.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logooooo" />
    </StyledLogo>
  );
}

export default Logo;
