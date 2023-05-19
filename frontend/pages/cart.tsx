import styled from "styled-components";

const CartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

const CartTitle = styled.h1`
  font-size: 2em;
  color: #333;
`;

export default function Cart() {
  return (
    <CartPageContainer>
      <CartTitle>Cart Page</CartTitle>
    </CartPageContainer>
  );
}
