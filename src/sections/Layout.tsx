import Header from './Header';

type IProps = {
  children: any;
};

export default function Layout({ children }: IProps) {
  return (
    <>
      <div className="h-screen overflow-y-scroll scrollbar-hide max-w-6xl mx-auto">
        <Header />
        <main className="flex-grow container mx-auto sm-px-6 min-h-screen mt-4">{children}</main>
      </div>
    </>
  );
}
