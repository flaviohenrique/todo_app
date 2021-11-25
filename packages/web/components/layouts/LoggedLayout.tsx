import { NavBar, Footer, ProfileMenu } from "ui-components";
import { LayoutComponentProps } from "./types";
import { useAppSelector } from "../../app/hooks";

export default function LoggedLayout({ children }: LayoutComponentProps) {
  const name = useAppSelector((state) => state.auth.name);

  return (
    <>
      <NavBar>
        <ProfileMenu name={name} />
      </NavBar>
      <main>{children}</main>
      <Footer />
    </>
  );
}
