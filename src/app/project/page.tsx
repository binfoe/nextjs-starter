import { redirect } from 'next/navigation';
import { auth } from '@server/service/auth';

export default async function ServerSideAuth() {
  const session = await auth();
  if (!session) {
    redirect('/signin');
    return <div>请登录...</div>;
  }
  return (
    <div>
      <header className='mb-10 border-b pb-10 dark:border-gray-700'>
        <p className='mb-2 text-sm font-semibold text-blue-600'>Server Side Auth</p>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl'>
          服务端登录鉴权
        </h1>
        <p className='mt-2 text-lg text-gray-800 dark:text-gray-400'>
          这个页面必须在登录之后才能访问，否则会跳转到 /login 页面
        </p>
      </header>
      <div>已登录账号信息：</div>
      <pre>
        <code>{JSON.stringify(session.user, null, 2)}</code>
      </pre>
    </div>
  );
}
