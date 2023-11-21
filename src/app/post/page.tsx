import { PostList } from './PostList';
import { listProject } from '@server/actions/post';

export default async function SSRPost({ searchParams }: { searchParams: Record<string, string> }) {
  const [err, ssrData] = await listProject({
    page: Number(searchParams['page'] || 0),
    size: 1,
  });

  return (
    <div>
      <h1>列表同构渲染</h1>
      <ul>
        <li>初始加载页面，列表数据由 SSR 直接渲染，浏览器端看不到 ajax 网络请求。</li>
        <li>浏览器端切换分页后，列表数据由 CSR 渲染，浏览器端可看到 ajax 请求。</li>
      </ul>
      <div>
        <h2>All My Posts</h2>
        {!err && <PostList ssrData={ssrData} />}
      </div>
    </div>
  );
}
