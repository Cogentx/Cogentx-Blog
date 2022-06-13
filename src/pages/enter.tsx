import Loading from "../components/Loading";

type IProps = {
  prop: any;
};

export default function EnterPage({ prop }: IProps) {

  return (
    <main>
      <Loading show={true}/>
    </main>
  );
};
