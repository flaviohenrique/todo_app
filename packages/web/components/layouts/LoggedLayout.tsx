import { NavBar, Footer, ProfileMenu } from "ui-components";
import { LayoutComponentProps } from "./types";
import { useAppSelector } from "../../app/hooks";
import { selectAvatarImgUrl } from "../../domain/userSlice";
import Link from "next/link"

export default function LoggedLayout({ children }: LayoutComponentProps) {
  const name = useAppSelector((state) => state.auth.name);
  const avatarImgUrl = useAppSelector(selectAvatarImgUrl);

  const links = [
    <Link href="/profile" ><a>My Profile</a></Link>,
    <Link href="/api/auth/logout" ><a>Logout</a></Link>,
  ]

  return (
    <>
      <NavBar>
        <ProfileMenu name={name} avatarImgUrl={avatarImgUrl} links={links} ></ProfileMenu>
      </NavBar>
      <main>{children}</main>
      <Footer />
    </>
  );
}
