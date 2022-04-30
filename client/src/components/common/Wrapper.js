import styled from "@emotion/styled";

const Wrapper = styled("div")`
  background: ${(props) => props.theme.background};
  width: 100vw;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen";
  h1 {
    color: ${(props) => props.theme.body};
  }
  p {
    color: ${(props) => props.theme.body};
  }
`;

export default Wrapper;
