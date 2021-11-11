import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import { LayoutComponentProps } from "./types";

export default function LoggedLayout({ children, user }: LayoutComponentProps) {
  return (
    <>
      {/* <Header /> */}
      <NavBar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
