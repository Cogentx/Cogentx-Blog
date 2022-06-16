import Loading from "../components/Loading";

type IProps = {
  prop: any;
};

export default function SignInPage({ prop }: IProps) {

  return (
    <main>
      <Loading show={true}/>
    </main>
  );
};
