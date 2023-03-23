import styled from "styled-components";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  gap: 8px;

  button {
    border: 1px solid #000;
    padding: 8px 16px;
    border-radius: 6px;
    background-color: transparent;

    &:disabled {
      border-color: #eee;
    }
  }
`;

const Pagination = ({ current = 1, total = 0, className }) => {
  return (
    <Container className={className}>
      <button disabled={current <= 1}>{"<<"}</button>
      {current}/{total}
      <button disabled={current >= total}>{">>"}</button>
    </Container>
  );
};

export default styled(Pagination)``;
