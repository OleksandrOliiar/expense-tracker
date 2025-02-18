import { getProducts } from "@/actions/getProducts";
import PricingClient from "./PricingClient";

const PricingServer = async () => {
  const products = await getProducts();

  return <PricingClient products={products} />;
}

export default PricingServer