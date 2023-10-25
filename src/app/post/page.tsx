import Link from 'next/link';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PostList } from './PostList';
import { trpcServerClient } from '@server/service/trpc-client';

export default async function SSRPost({ searchParams }: { searchParams: Record<string, string> }) {
  const posts = await trpcServerClient.post.list({
    page: Number(searchParams['page'] || 0),
    size: 1,
  });

  return (
    <div>
      <h1>列表同构渲染</h1>
      <ul>
        <li>初始加载页面，列表数据由 SSR 直接渲染，浏览器端看不到 ajax 网络请求。</li>
        <li>浏览器端切换分页后，列表数据由 CSR 渲染，浏览器端可看到 ajax 请求。</li>
        <li>
          尽可能让 SSR 渲染和 CSR 渲染的代码保持一致，但目前仍不够简洁。后续应该保持对 trpc 和 next
          社区最新进展的关注。
        </li>
      </ul>
      <div>
        <h2>All My Posts</h2>
        <PostList initdata={posts} />
      </div>
      <div>
        <Link href='/component'>Jump to Components</Link>
      </div>
      {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
    </div>
  );
}
