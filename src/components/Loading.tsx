// Loading Spinner
import { Audio } from 'react-loader-spinner';

type IProps = {
  show: boolean;
};

export default function Loading({ show }: IProps) {
  return !show ? null : (
    <div className="grid h-screen place-items-center">
      <Audio color="#01B400" height={100} width={100} />
    </div>
  );
}
