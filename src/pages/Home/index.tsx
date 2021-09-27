import { Header } from "../../components/Header";
import { NewProduct } from "../../components/NewProduct";
import { TableData } from "../../components/TableData";

export function Home() {
  return (
    <>
      <Header title="Produtos" />
      <NewProduct />
      <TableData />
    </>
  );
}
