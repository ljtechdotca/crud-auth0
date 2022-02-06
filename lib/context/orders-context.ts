import { Order } from "@prisma/client";
import { createContext, Dispatch, SetStateAction } from "react";

export const OrdersContext = createContext<{
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
}>({ orders: [], setOrders: () => {} });
