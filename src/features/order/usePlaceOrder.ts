import useClickOutside from "@/hooks/useClickOutSide";
import { CartItem } from "@/Redux/cards";
import { OrderState } from "@/Redux/showOrder";

import { RootState } from "@/Redux/store";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface OrderInfo extends OrderState {
  createdAt: string;
}

interface Orders {
  date: OrderInfo[];
  items: CartItem[];
}

export const usePlaceOrder = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState<OrderState[]>([]);
  const state = useSelector((state: RootState) => state.showOrder);
  const card = useSelector((state: RootState) => state.cardItems);
  const dispacht = useDispatch();
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
    if (!state) return;

    if (state) {
    }
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
