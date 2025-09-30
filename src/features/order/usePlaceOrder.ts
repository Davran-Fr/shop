import useClickOutside from "@/hooks/useClickOutSide";
import Cookies from "js-cookie";

import { CartItem, clearItem } from "@/Redux/cards";
import { OrderState } from "@/Redux/showOrder";
import { RootState } from "@/Redux/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export interface Order {
  createdAt: string;
  address: OrderState;
  items: CartItem[];
  totalProducts: number;
  totalPrice: number;
}

export const usePlaceOrder = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState<OrderState[]>([]);
  const state = useSelector((state: RootState) => state.showOrder);
  const card = useSelector((state: RootState) => state.cardItems);
  const dispacht = useDispatch();
  const router = useRouter();
  const totalProducts = card.items.reduce((a, b) => a + b.count, 0);

  useClickOutside(ref, () => setOpen(false));

  const loadAddress = () => {
    try {
      const stored = localStorage.getItem("addresses");

      if (stored) {
        const parsed = JSON.parse(stored) as OrderState[];

        setAddresses(parsed);
      }
    } catch (e) {
      console.error("Invalid addresses in localStorage", e);

      setAddresses([]);
    }
  };

  const onSubmit = () => {
    if (!state || !card.items.length) return;

    const totalPrice = card.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    const newOrder: Order = {
      createdAt: new Date().toISOString(),
      address: state,
      items: card.items,
      totalProducts,
      totalPrice,
    };

    const prevOrders: Order[] = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const updatedOrders = [...prevOrders, newOrder];

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    dispacht(clearItem());
    Cookies.remove("cart");
    router.push("/my-orders");
  };

  return {
    onSubmit,
    loadAddress,
    setAddresses,
    addresses,
    dispacht,
    state,
    open,
    totalProducts,
    setOpen,
    card,
    ref,
  };
};
