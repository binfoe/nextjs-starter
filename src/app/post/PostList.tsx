'use client';

import { Post } from '@prisma/client';
import { FC, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Table, TableColumn } from 'preline-react/lib/table';
import { api } from '@client/trpc';

export const PostList: FC<{
  initdata: {
    total: number;
    list: Post[];
  };
}> = (props) => {
  const params = useSearchParams();
  const [pagiInfo, setPagiInfo] = useState({
    page: Number(params?.get('page') || 0),
    size: 1,
  });

  const isFirst = useRef(true);
  const { isLoading, data } = api.post.list.useQuery(pagiInfo, {
    refetchOnWindowFocus: false,
    initialData: () => {
      if (isFirst.current) {
        isFirst.current = false;
        return props.initdata;
      } else {
        return undefined;
      }
    },
  });

  const columns = useMemo(() => {
    return [
      {
        name: 'Id',
        thClassName: 'w-[20%]',
        render: (p) => p.id.toString(),
      },
      {
        name: 'Title',
        render: (p) => p.title,
      },
    ] as TableColumn<Post>[];
  }, []);

  return (
    <div>
      {/* <div>
        <Button
          onClick={() => {
            setPagiInfo({ page: 2, size: 1 });
          }}
        >
          TEST
        </Button>
      </div> */}
      <Table
        data={data?.list}
        loading={isLoading}
        columns={columns}
        pagination={{
          total: data?.total,
          pageNumber: pagiInfo.page,
          pageSize: pagiInfo.size,
          onChange(page, size) {
            window.history.replaceState(
              null,
              '',
              `${location.pathname}?${new URLSearchParams({ page: page.toString() })}`,
            );
            setPagiInfo({ page, size });
          },
        }}
      />
    </div>
  );
};
