import { IUserProfile } from "../@interfaces/IUser";

type IProps = {
  user: IUserProfile;
};

export default function UserProfile({ user }: IProps) {

  return (
    <div>
      UserProfile
    </div>
  );
};



