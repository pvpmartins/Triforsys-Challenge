import api, { updateProduct } from "@/api";
import { Product } from "@/types";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "react-modal";
import { styled } from "styled-components";

type Props = {
  selectedProduct: Product;
  setSelectedProduct: Dispatch<SetStateAction<Product>>;
};

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

const UpdateProductForm = ({ setSelectedProduct, selectedProduct }: Props) => {
  const [nome, setNome] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [qtd, setQtd] = useState<number>(0);

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState<any[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct(nome, preco, qtd, selectedProduct.id);
    } catch (error: any) {
      const errorsValidation = error?.response?.data?.message?.errors;
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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded"
      >
        <h2 className="text-2xl mb-4">{selectedProduct.nome} - Editar</h2>

        <div className="mb-4">
          <label htmlFor="nome" className="block font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="preco" className="block font-medium text-gray-700">
            Preço
          </label>
          <input
            type="number"
            id="preco"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setPreco(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="qtd" className="block font-medium text-gray-700">
            Quantidade
          </label>
          <input
            type="number"
            id="qtd"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setQtd(Number(e.target.value))}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Editar
        </button>
      </form>
      <ErrorModal
        isOpen={errorModalOpen}
        closeModal={closeErrorModal}
        errorMessages={errorMessages}
      />
    </>
  );
};

export default UpdateProductForm;
