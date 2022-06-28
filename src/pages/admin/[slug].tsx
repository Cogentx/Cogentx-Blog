import AuthCheck from '../../components/AuthCheck';
import PostManager from '../../components/PostManager';

export default function AdminPostEditPage() {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}
