import Head from 'next/head';
import { metatags } from '../../@domains/cx-metatags';

type IProps = {
  title: string;
  description?: string;
  image?: string;
};

export default function Metatags({
  title = metatags.title,
  description = metatags.description,
  image = metatags.image,
 }: IProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={metatags.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
