import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import api from "@/api";
import { Product } from "@/types";
import "../../app/globals.css";
import { styled } from "styled-components";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nome, setNome] = useState<string>();
  const [preco, setPreco] = useState<number>();
  const [qtd, setQtd] = useState<number>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);

  const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f8f8f8;
  `;

  const Button = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    margin: 20px 0;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #0056b3;
    }
  `;

  const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const Form = styled.form`
    display: flex;
    flex-direction: column;
  `;

  const Input = styled.input`
    margin-bottom: 10px;
  `;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await api.get(`/products/${id}`);
          setProduct(res.data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (!product) return;
    setNome(product.nome);
    setPreco(product.preco);
    setQtd(product.qtd);
  }, [product]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEdit = async () => {
    try {
      await api.put(`/products/${id}`, {
        nome,
        preco,
        qtd,
      });
    } catch (error) {
      console.error("Houve algum erro ao buscar o produto.", error);
    }
    router.reload();
  };

  return (
    <PageWrapper>
      <Button onClick={openModal}>Edit</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Product"
      >
        <ModalContent>
          <h2>Edit Product</h2>
          <Form>
            <label>
              Name:
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
            <label>
              Price:
              <Input
                type="number"
                value={preco}
                onChange={(e) => setPreco(Number(e.target.value))}
              />
            </label>
            <label>
              Quantity:
              <Input
                type="number"
                value={qtd}
                onChange={(e) => setQtd(Number(e.target.value))}
              />
            </label>
            <Button onClick={handleEdit}>Submit</Button>
          </Form>
          <Button onClick={closeModal}>Close</Button>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
};

export default ProductPage;
