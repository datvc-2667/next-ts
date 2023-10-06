import useSWRInfinite from 'swr/infinite';
import { useMemo } from 'react';

import { ICursorMeta, IMeta, IResponse } from '@/typings/baseResponse';

import useEffectWithoutStrict from './useEffectWithoutStrict';

export default function useInfiniteLoading<T, TMeta = IMeta>({
  enabled = true,
  revalidateFirstPage,
  getKey,
  fetcher,
}: {
  enabled?: boolean;
  revalidateFirstPage?: boolean;
  getKey: (
    pageIndex: number,
    previousPageData?: IResponse<T, TMeta>,
  ) => string | null;
  fetcher: (url: string) => Promise<IResponse<T, TMeta>>;
}) {
  const { data, size, setSize, isLoading, isValidating, error, mutate } =
    useSWRInfinite(
      enabled ? getKey : () => null, // Pass a dummy function when not enabled
      enabled ? fetcher : () => Promise.resolve(null), // Pass a dummy fetcher when not enabled
      {
        revalidateOnFocus: false,
        revalidateFirstPage: !!revalidateFirstPage,
      },
    );
  const items = useMemo(
    () => (data ? Array<T>().concat(...data.map(d => d?.data ?? [])) : []),
    [data],
  );

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data && data[0]?.data?.length === 0;
  const lastData: IResponse<T, TMeta> | null = data
    ? data[data.length - 1]
    : null;
  const isReachingEnd =
    !!error ||
    isEmpty ||
    (!!lastData &&
      ((lastData.meta as IMeta).total !== undefined ||
      (lastData.meta as IMeta).currentPage !== undefined
        ? (lastData.meta as IMeta).total <=
          (lastData.meta as IMeta).currentPage * (lastData.meta as IMeta).take
        : !(lastData.meta as ICursorMeta).remain));
  const meta = lastData
    ? lastData.meta
    : ({ take: 10, total: 0, remain: 0, currentPage: 1 } as TMeta);

  useEffectWithoutStrict(() => {
    void setSize(1);
  }, []);

  return {
    data,
    size,
    setSize,
    isEmpty,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isValidating,
    items,
    meta,
    mutate,
  };
}
