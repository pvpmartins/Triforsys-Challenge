import { Dispatch, SetStateAction } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const Button = styled.button`
  background-color: #4c51bf;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const PlusIcon = styled.span`
  position: relative;
  margin-right: 0.5rem;

  &::before {
    content: "+";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
type Props = {
  setCreateModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AddProductButton = ({ setCreateModalIsOpen }: Props) => {
  return (
    <>
      <Button
        onClick={() => setCreateModalIsOpen(true)}
        data-tip="Adicionar um produto"
      >
        <PlusIcon />
        Adicionar Produto
      </Button>
      {/* <ReactTooltip place="top" effect="solid" /> */}
    </>
  );
};

export default AddProductButton;
