import Image from 'next/image';
import { IUserProfile } from '../@interfaces/IUser';

type IProps = {
  user: IUserProfile;
};

export default function UserProfile({ user }: IProps) {
  return (
    <div className="flex flex-col align-center text-center">
      <Image priority src={user.photoUrl || '/avatar.png'} alt="user profile photo" width={40} height={40} />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous'}</h1>
    </div>
  );
}
