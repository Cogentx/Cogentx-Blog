// Loading Spinner
import toast from 'react-hot-toast';
import { Audio } from 'react-loader-spinner';

type IProps = {
  show: boolean;
};

export default function Loading({ show }: IProps) {
  return !show ? null : (
    <div className="grid h-screen place-items-center" onClick={() => toast.success('Welcome to Cogent X Blog')}>
      <Audio color="#01B400" height={100} width={100} />
    </div>
  );
}
