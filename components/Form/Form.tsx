import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { FormContext } from "../../lib/context/form-context";
import { OrdersContext } from "../../lib/context/orders-context";
import styles from "./Form.module.scss";

export interface FormProps {
  target: string | null;
  handleTarget: (target: string | null) => any;
}

export const Form = ({ target, handleTarget }: FormProps) => {
  const { form, setForm } = useContext(FormContext);
  const { orders, setOrders } = useContext(OrdersContext);
  const { user } = useAuth0();

  const handleForm = async (type: string, payload: Record<string, any>) => {
    const { event } = payload;

    switch (type) {
      case "reset":
        break;

      case "submit":
        event.preventDefault();
        const formData = Object.fromEntries(
          new FormData(event.target as HTMLFormElement)
        );

        let response: Response;
        if (target) {
          response = await fetch(`/api/orders?orderId=${target}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const { payload } = await response.json();
          const targetIndex = orders.findIndex((order) => order.id === target);
          let newOrders = [...orders];
          newOrders[targetIndex] = payload.order;
          setOrders(newOrders);
          handleTarget(null);
        } else {
          response = await fetch(`/api/orders?userId=${user?.sub}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const { payload } = await response.json();
          setOrders((state) => [...state, payload.order]);
        }
        break;
      default:
        console.error("Bad Form Method");
        break;
    }
  };

  return (
    <div className={styles.root}>
      <form
        onSubmit={(event) => handleForm("submit", { event })}
        className={styles.container}
      >
        <input
          type="text"
          name="title"
          id="title"
          onChange={(event) =>
            setForm((state) => ({ state, title: event.target.value }))
          }
          value={form.title}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          id="description"
          onChange={(event) =>
            setForm((state) => ({ state, description: event.target.value }))
          }
          value={form.description}
          placeholder="Whats on your mind?"
        />
        <button type="submit">Submit</button>
        <button type="reset" onClick={() => handleForm("reset", {})}>
          Reset
        </button>
      </form>
    </div>
  );
};
