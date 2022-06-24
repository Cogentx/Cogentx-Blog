// usernames/{username} | Username requires uniqueness tracking
interface IUsername {
  uid: string;
}

// users/{uid} | Public user profile
interface IUserProfile {
  uid: string;
  username: string;
  displayName: string;
  photoUrl: string;
}

export type { IUsername, IUserProfile };
