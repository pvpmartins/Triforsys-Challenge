import { createProduct } from "@/api";
import { Error, ValidationFail } from "@/types";
import { AxiosError } from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

type Props = {
  createModalIsOpen: boolean;
  setCreateModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalContainer = styled.div`
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      display: flex;
      flex-direction: column;

      input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #4c51bf;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #667eea;
      }

      &.cancel-btn {
        background-color: #ccc;
        &:hover {
          background-color: #999;
        }
      }
    }
  }

  .error-messages {
    padding: 1rem;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    margin-top: 1rem;
  }
`;

type ErrorField = {
  field: string;
  message: string;
};

type ErrorModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  errorMessages: ErrorField[];
};

const ErrorModalContainer = styled.div`
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  background-color: #f8d7da;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #4c51bf;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #667eea;
    }
  }
`;

const ErrorModal = ({ isOpen, closeModal, errorMessages }: ErrorModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Error Modal"
      style={{
        content: {
          height: "fit-content",
          width: "fit-content",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
          padding: 0,
        },
      }}
    >
      <ErrorModalContainer>
        <h2>Error</h2>
        {errorMessages.map((error, index) => (
          <p key={index}>
            <strong>{error.field}: </strong>
            {error.message}
          </p>
        ))}
        <button onClick={closeModal}>Close</button>
      </ErrorModalContainer>
    </Modal>
  );
};

const CreateProductModal = ({
  createModalIsOpen,
  setCreateModalIsOpen,
}: Props) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState<ErrorField[]>([]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(productName, productPrice, productQuantity);
      setProductName("");
      setProductPrice(0);
      setProductQuantity(0);
      setCreateModalIsOpen(false);
    } catch (error: any) {
      const errorsValidation = error.response?.data?.message?.errors;
      if (errorsValidation) {
        setErrorMessages(errorsValidation);
        setErrorModalOpen(true);
      }
    }
  };

  const closeErrorModal = () => {
    setErrorModalOpen(false);
    setErrorMessages([]);
  };

  useEffect(() => {
    console.log("create modal");
  }, []);

  return (
    <>
      <Modal
        isOpen={createModalIsOpen}
        onRequestClose={() => setCreateModalIsOpen(false)}
        contentLabel="Create Product"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            border: "none",
            borderRadius: "8px",
            padding: 0,
            height: "fit-content",
            width: "fit-content",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          },
        }}
      >
        <ModalContainer>
          <h2>Create Product</h2>
          <form onSubmit={handleCreateProduct}>
            <label>
              Name:
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(Number(e.target.value))}
              />
            </label>
            <button type="submit">Create</button>
            <button
              className="cancel-btn"
              onClick={() => setCreateModalIsOpen(false)}
            >
              Cancel
            </button>
          </form>
        </ModalContainer>
      </Modal>
      <ErrorModal
        isOpen={errorModalOpen}
        closeModal={closeErrorModal}
        errorMessages={errorMessages}
      />
    </>
  );
};

export default CreateProductModal;
