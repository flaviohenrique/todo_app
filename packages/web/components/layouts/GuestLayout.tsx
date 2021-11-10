type props = {
  children: React.ReactNode;
};

export default function GuestLayout({ children }: props) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
