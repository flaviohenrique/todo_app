import { LayoutComponentProps } from "./types";

export default function GuestLayout({ children }: LayoutComponentProps) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
