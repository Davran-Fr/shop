import useClickOutside from "@/hooks/useClickOutSide";
import Cookies from "js-cookie";

import { CartItem, clearItem } from "@/Redux/cards";
import { OrderState } from "@/Redux/showOrder";
import { RootState } from "@/Redux/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addOrder } from "@/Redux/orders";

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
  const [place, setPlace] = useState<OrderState>();
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
    if ((!state || !place) && card.items.length > 0) {
      loadAddress();
      // alert('wd')  
      return;
    }

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

    dispacht(addOrder(newOrder));
    dispacht(clearItem());
    Cookies.remove("cart");
    router.push("/account/my-orders");
  };

  return {
    place,
    onSubmit,
    loadAddress,
    setAddresses,
    addresses,
    dispacht,
    state,
    open,
    totalProducts,
    setPlace,
    setOpen,
    card,
    ref,
  };
};
