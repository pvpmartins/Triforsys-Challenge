import api, { deleteProduct } from "@/api";
import { Meta, Product } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import "../app/globals.css";
import UpdateProductForm from "@/components/Form";
import Header from "@/components/Header";
import PlusBtn from "@/components/Icons/PlusBtn";
import CreateProductModal from "@/components/CreateProductModal";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    padding: 0,
    width: "400px",
    margin: "auto",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    height: "fit-content",
  },
};

const Badge = styled.span<{ quantity: number }>`
  position: relative;
  display: flex;
  padding: 5px 10px;
  border-radius: 4rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  transition: transform 2s ease-in-out;
  background-color: ${({ quantity }) => {
    if (quantity < 10) return "red";
    if (quantity < 31) return "orange";
    return "green";
  }};
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  &:hover {
    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 105%;
      left: 50%;
      transform: translateX(-50%);
      padding: 5px;
      background-color: #333;
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0.9;
    }
  }
`;

type Props = {
  products: Product[];
  pagination: Meta;
};

const Home = ({ products, pagination }: Props) => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getColorClass = (qtd: number) => {
    if (qtd < 10) {
      return "bg-red-500";
    } else if (qtd >= 10 && qtd <= 30) {
      return "bg-orange-500";
    } else {
      return "bg-green-500";
    }
  };

  const Pagination = styled.div`
    .pagination-link {
      padding: 0.5rem 1rem;
      color: #fff;
      background-color: #4c51bf;
      border-radius: 0.25rem;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }

    .pagination-link:hover {
      background-color: #667eea;
    }

    .pagination-text {
      margin: 0 1rem;
      color: #4b5563;
      font-weight: bold;
      text-transform: uppercase;
    }
  `;

  const [limit, setLimit] = useState(10);

  const handleLimitChange = (event: { target: { value: string } }) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
  };

  useEffect(() => {
    router.push({
      pathname: "/",
      query: { limit },
    });
  }, [limit]);

  return (
    <>
      <Header />
      <div className="flex flex-col justify-around items-center  bg-gray-100 p-10">
        <div className="flex justify-around items-center gap-52 mb-3">
          <PlusBtn setCreateModalIsOpen={setCreateModalIsOpen} />

          <CreateProductModal
            createModalIsOpen={createModalIsOpen}
            setCreateModalIsOpen={setCreateModalIsOpen}
          />

          {pagination.total > 10 && (
            <div className="scroll-container flex flex-col justify-center items-center">
              <label htmlFor="limit-range">Produtos por Pagina</label>
              <input
                type="range"
                id="limit-range"
                min="10"
                max={pagination.total}
                step={pagination.total - 10 ? 1 : 10}
                value={router.query.limit}
                onChange={handleLimitChange}
              />
              <span>{limit}</span>
            </div>
          )}
          {pagination && (
            <>
              <Badge
                className="relative "
                data-tooltip={`Quantidade Total`}
                quantity={pagination.totalItemsQtd}
              >
                {pagination.totalItemsQtd}
              </Badge>
            </>
          )}
        </div>
        <div className="flex flex-wrap justify-around items-center top-0 relative">
          {products &&
            products.map((product) => (
              <div
                className={` relative max-w-sm rounded overflow-hidden shadow-lg m-4 ${getColorClass(
                  product.qtd
                )}`}
                key={product.id}
              >
                <button
                  onClick={() => {
                    deleteProduct(product.id);
                    router.reload();
                  }}
                  className="right-1 top-1 absolute bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-sm"
                >
                  Deletar
                </button>

                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{product.nome}</div>
                  <p className="text-gray-700 text-base">
                    Price: ${product.preco}
                  </p>
                  <p className="text-gray-700 text-base">
                    Quantity: {product.qtd}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <button
                    onClick={() => openModal(product)}
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    {/* <Link href={`/product/${product.id}`}>Edit</Link> */}
                    Edit
                  </button>
                </div>
              </div>
            ))}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Product"
          style={modalStyles}
        >
          <UpdateProductForm
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </Modal>
        <Pagination>
          <div className="flex items-center justify-center mt-8">
            {pagination.current_page > 1 && (
              <Link
                className="pagination-link"
                href={`/?page=${pagination.current_page - 1}`}
              >
                &lt;
              </Link>
            )}
            <span className="pagination-text">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            {pagination.current_page < pagination.last_page && (
              <Link
                className="pagination-link"
                href={`/?page=${pagination.current_page + 1}`}
              >
                &gt;
              </Link>
            )}
          </div>
        </Pagination>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: {
  query: { page: number; limit: number };
}) => {
  const page = context.query.page || 1;
  const limit = context.query.limit || 10;

  const res = await fetch(
    `http://backend:3333/api/products?page=${page}&limit=${limit}`
  );
  const data = await res.json();
  const { data: products } = data;

  return {
    props: { products, pagination: data.meta },
  };
};
