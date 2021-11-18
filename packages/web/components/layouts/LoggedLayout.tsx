import Footer from "./Footer";
import NavBar from "./NavBar";
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
