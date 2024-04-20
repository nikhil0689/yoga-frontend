import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 8rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/droopy.jpg" alt="Logooooo" />
    </StyledLogo>
  );
}

export default Logo;
