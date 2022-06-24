// usernames/{username} | Username requires uniqueness tracking
interface IUsername {
  uid: string;
}

// users/{uid} | Public user profile
interface IUser {
  uid: string;
  username: string;
  photoUrl: string;
}

export type { IUsername, IUser };
