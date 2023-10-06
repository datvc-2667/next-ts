import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import HomeTemplate from '@/templates/Home';

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  return <HomeTemplate />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
    };
  } catch (error) {
    return {
      props: {
        ...(await serverSideTranslations(locale as string, ['common'])),
      },
    };
  }
};

export default Home;
