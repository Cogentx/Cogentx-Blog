import { IUserProfile } from '../@interfaces/IUser';

type IProps = {
  user: IUserProfile;
};

export default function UserProfile({ user }: IProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img src={user.photoUrl || '/avatar.png'} alt="user profile photo" className="w-20 h-20 rounded-full" />
      <p className="mt-4">
        <i>@{user.username}</i>
      </p>
      <h1 className="text-3xl font-bold mt-4">{user.displayName || 'Anonymous'}</h1>
    </div>
  );
}
