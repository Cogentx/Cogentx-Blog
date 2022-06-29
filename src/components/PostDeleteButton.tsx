import { DocumentReference } from 'firebase/firestore';

interface IProps {
  postRef: DocumentReference;
}

export default function PostDeleteButton({ postRef }: IProps) {
  return <div>PostDeleteButton</div>;
}
