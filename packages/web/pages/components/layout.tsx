import { IUser } from "../../interfaces";
import Footer from "./footer";
import Header from "./header";
import NabBar from "./navbar";

type props = {
  children: React.ReactNode;
  user: IUser;
};

export default function Layout({ children, user }: props) {
  console.log(`@@@@ user`, user);

  return (
    <>
      <Header />
      <NabBar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
