// Loading Spinner
type IProps = {
  show: boolean;
};

export default function Loading({ show }: IProps) {
  return show ? (
    <div className="w-14 h-14 border-[10px] border-indigo-200 border-t-indigo-500 rounded-full animate-loading-spinner"></div>
  ) : null;
}
