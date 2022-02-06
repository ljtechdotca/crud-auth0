import { useAuth0 } from "@auth0/auth0-react";
import getConfig from "next/config";
import styles from "./Header.module.scss";

export interface HeaderProps {}

const {
  publicRuntimeConfig: { url },
} = getConfig();

export const Header = ({}: HeaderProps) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  return (
    <header className={styles.root}>
      {isLoading ? (
        <></>
      ) : (
        <div className={styles.container}>
          {isAuthenticated ? (
            <>
              <div>{user?.name}</div>
              <button onClick={() => logout({ returnTo: url })}>
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={() => loginWithRedirect({ returnTo: url })}>
              Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
};
