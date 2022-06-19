import Header from './Header';

type IProps = {
  children: any;
};

export default function Layout({ children }: IProps) {
  return (
    <>
      <div className="flex flex-col h-screen overflow-y-scroll scrollbar-hide max-w-6xl mx-auto">
        <Header />

        <main className="flex-1 container mx-auto sm-px-6 mt-4">{children}</main>
      </div>
    </>
  );
}
