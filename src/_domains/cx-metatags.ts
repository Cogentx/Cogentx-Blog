interface IMetatags {
  title: string;
  description?: string;
  image?: string;
  twitter?: string;
}

const metatags: IMetatags = {
  title: 'Cogentx',
  description: 'Projects. Simplified.',
  image: '/cx-logo-512.png',
  twitter: '@Cogentx360',
};

export { metatags };
