import { useAuth0 } from "@auth0/auth0-react";
import { Order } from "@prisma/client";
import type { GetStaticProps, NextPage } from "next";
import getConfig from "next/config";
import React, { useContext, useEffect, useState } from "react";
import { Form, Orders } from "../components";
import { FormContext } from "../lib/context/form-context";
import { OrdersContext } from "../lib/context/orders-context";
import styles from "../styles/Home.module.scss";

const {
  publicRuntimeConfig: { url },
} = getConfig();

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${url}/api/orders`);

  const { payload } = await response.json();

  return {
    props: {
      ordersProps: payload.orders as Order[],
    },
  };
};

interface HomeProps {
  ordersProps: Order[];
}

const Home: NextPage<HomeProps> = ({ ordersProps }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { orders, setOrders } = useContext(OrdersContext);
  const { form, setForm } = useContext(FormContext);
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    setOrders(ordersProps);
  }, [ordersProps, setOrders]);

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.center}>
            <div>LOADING</div>
          </div>
        ) : isAuthenticated ? (
          <>
            {target}
            <Form
              target={target}
              handleTarget={(target) => setTarget(target)}
            />
          </>
        ) : (
          <div className={styles.center}>
            <div>Please Sign In</div>
          </div>
        )}
        <Orders handleTarget={(target) => setTarget(target)} list={orders} />
      </div>
    </section>
  );
};

export default Home;
