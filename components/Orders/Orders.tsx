import { useAuth0 } from "@auth0/auth0-react";
import { Order } from "@prisma/client";
import { useContext } from "react";
import { FormContext } from "../../lib/context/form-context";
import { OrdersContext } from "../../lib/context/orders-context";
import styles from "./Orders.module.scss";

export interface OrdersProps {
  list: Order[];
  handleTarget: (target: string | null) => any;
}

export const Orders = ({ list, handleTarget }: OrdersProps) => {
  const { isAuthenticated } = useAuth0();
  const { orders, setOrders } = useContext(OrdersContext);
  const { form, setForm } = useContext(FormContext);

  const handleUpdate = async ({ id, title }: Order) => {
    setForm({
      title,
    });
    handleTarget(id);
  };

  const handleDelete = async ({ id }: Order) => {
    let response = await fetch(`/api/orders?orderId=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { payload } = await response.json();
    let newOrders = orders.filter((order) => order.id !== payload.order.id);
    setOrders(newOrders);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {list.map((order: Order) => (
          <div key={order.id} className={styles.order}>
            {isAuthenticated && (
              <div className={styles.buttons}>
                <button onClick={() => handleUpdate(order)}>Edit</button>
                <button className="red" onClick={() => handleDelete(order)}>
                  Delete
                </button>
              </div>
            )}
            <div>
              <h6>{order.title}</h6>
              <p>{order.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
