import { AuthPageProps, IUser } from "../../interfaces";
import Link from "next/link";

const loggedUser = (user: IUser) => {
  return (
    <>
      <li>Olá {user.name}</li>
      <li>
        <a href={`/api/auth/logout`}>Logout</a>
      </li>
    </>
  );
};

const loginUser = () => {
  return (
    <li>
      <Link href={`/auth/login`}>
        <a>Login</a>
      </Link>
    </li>
  );
};

const NavBar = (props: AuthPageProps) => {
  const Items = props.user !== undefined ? loggedUser(props.user) : loginUser();

  return (
    <nav>
      <ul>{Items}</ul>
    </nav>
  );
};

export default NavBar;
