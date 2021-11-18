// import Footer from "ui-components";
import { NavBar, Footer } from "ui-components";
import { LayoutComponentProps } from "./types";

export default function LoggedLayout({ children, user }: LayoutComponentProps) {
  return (
    <>
      <NavBar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
