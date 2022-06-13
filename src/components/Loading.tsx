// Loading Spinner
import { Circles } from 'react-loader-spinner';

type IProps = {
  show: boolean;
};

export default function Loading({ show }: IProps) {
  return !show ? null : (
    <div className="grid h-screen place-items-center">
      <Circles color="#333" height={100} width={100} />
    </div>
  );
}
