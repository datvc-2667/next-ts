import { routes } from '@/constants';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/navigation';

const Error404: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const router = useRouter();

  const goToTopPage = () => {
    router.push(routes.HOME);
  };

  return (
    <>
      <div className="h-screen w-screen bg-blue-600 flex justify-center content-center flex-wrap">
        <p className="font-sans text-white error-text">404</p>
      </div>

      <div className="absolute w-screen bottom-0 mb-6 text-white text-center font-sans text-xl">
        <span className="opacity-50">Take me back to</span>
        <a className="border-b" onClick={goToTopPage}>
          Home
        </a>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const i18n = await serverSideTranslations(locale ?? 'jp', ['common']);

  return {
    props: {
      ...i18n,
    },
  };
};

export default Error404;
