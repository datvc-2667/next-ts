import { Footer } from '@/organisms/Footer';
import { Header } from '@/organisms/Header';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import { useSWRConfig } from 'swr';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';

interface IParams {
  take?: number;
  query?: string | null;
}

const TOAST_OFFLINE_ID = 'offline';
const TOAST_WARNING_METAMASK_INSTALL_ID = 'metamask-install';
const USER_IS_DISABLED = 'User is disabled.';

const privatePaths = [''];

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { connectAsync, isLoading } = useConnect();
  const {
    signMessageAsync,
    isLoading: isSignLoading,
    reset,
  } = useSignMessage();
  const {
    disconnect,
    disconnectAsync,
    isLoading: isDisconnectLoading,
  } = useDisconnect();
  const { connector, isDisconnected, isConnected, address } = useAccount();

  const { t } = useTranslation('common');
  const { mutate } = useSWRConfig();
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col text-neutral-900">
      <Header />
      <main className="flex-1 bg-neutral-50 px-4 py-6 md:p-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
