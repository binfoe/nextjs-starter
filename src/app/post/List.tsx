'use client';

import { Post } from '@prisma/client';
import { FC, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Table, TableColumn } from 'preline-react/lib/table';
import { useNonFirstEffect } from 'preline-react/lib/util';
import { Toast } from 'preline-react/lib/toast';
import { listProject } from '@server/actions/post';

export const PostList: FC<{
  ssrData: {
    total: number;
    list: Post[];
  };
}> = (props) => {
  const params = useSearchParams();
  const [pagiInfo, setPagiInfo] = useState({
    page: Number(params?.get('page') || 0),
    size: 1,
  });

  const [data, setData] = useState(props.ssrData);
  const [loading, setLoading] = useState(false);
  const load = async () => {
    setLoading(true);
    const [err, data] = await listProject(pagiInfo);
    setLoading(false);
    if (err) {
      Toast.error(`${err.message}`);
    } else {
      setData(data);
    }
  };
  useNonFirstEffect(() => {
    load();
  }, [pagiInfo]);

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
        bordered
        loading={loading}
        columns={columns}
        pagination={{
          className: 'm-2',
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
