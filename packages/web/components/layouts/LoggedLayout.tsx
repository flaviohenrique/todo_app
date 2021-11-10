import { IUser } from "../../interfaces";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";

type props = {
  children: React.ReactNode;
  user: IUser;
};

export default function LoggedLayout({ children, user }: props) {
  return (
    <>
      {/* <Header /> */}
      <NavBar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
