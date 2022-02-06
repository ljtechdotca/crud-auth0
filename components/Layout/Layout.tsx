import { Auth0Provider } from "@auth0/auth0-react";
import { Order } from "@prisma/client";
import getConfig from "next/config";
import React, { useState } from "react";
import { Header } from "..";
import { INIT_FORM } from "../../lib/constants/init-form";
import { FormContext } from "../../lib/context/form-context";
import { OrdersContext } from "../../lib/context/orders-context";
import styles from "./Layout.module.scss";

const {
  publicRuntimeConfig: { url },
} = getConfig();

export interface LayoutProps {}

export const Layout = ({ children }: React.PropsWithChildren<LayoutProps>) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState<Record<string, any>>(INIT_FORM);

  return (
    <Auth0Provider
      domain="dev-l-l2xrbs.us.auth0.com"
      clientId="dh3VzgHVOqYALi1os1FZBqkzOCn3s5Fl"
      redirectUri={url}
    >
      <OrdersContext.Provider value={{ orders, setOrders }}>
        <FormContext.Provider value={{ form, setForm }}>
          <div className={styles.root}>
            <Header />
            <main className={styles.container}>{children}</main>
          </div>
        </FormContext.Provider>
      </OrdersContext.Provider>
    </Auth0Provider>
  );
};
