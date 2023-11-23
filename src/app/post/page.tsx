import { PostList } from './List';
import { listProject } from '@server/actions/post';

export default async function SSRPost({ searchParams }: { searchParams: Record<string, string> }) {
  const [err, ssrData] = await listProject({
    page: Number(searchParams['page'] || 0),
    size: 1,
  });

  return (
    <div>
      <header className='mb-10 border-b pb-10 dark:border-gray-700'>
        <p className='mb-2 text-sm font-semibold text-blue-600'>SSR & CSR Table</p>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl'>
          列表同构渲染
        </h1>
        <p className='mt-2 text-lg text-gray-800 dark:text-gray-400'>
          初始加载页面，列表数据由 SSR 直接渲染，浏览器端看不到 ajax 网络请求。
          浏览器端切换分页后，列表数据由 CSR 渲染，浏览器端可看到 ajax 请求。
        </p>
      </header>
      <p className='mb-2 text-sm font-semibold text-blue-600'>Data Render</p>
      <h2 className='mb-2 text-lg font-bold text-gray-800 dark:text-white'>All My Posts</h2>
      {!err && <PostList ssrData={ssrData} />}
    </div>
  );
}
