import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import MyCustomMenu from "./customMenu";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout menu={MyCustomMenu} >
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
