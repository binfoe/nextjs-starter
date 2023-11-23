import { LoginForm } from './LoginForm';
import { LoginModal } from './LoginModal';

export default function Login() {
  return (
    <div>
      <header className='mb-10 border-b pb-10 dark:border-gray-700'>
        <p className='mb-2 text-sm font-semibold text-blue-600'>Login</p>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl'>
          登录页面
        </h1>
        <p className='mt-2 text-lg text-gray-800 dark:text-gray-400'>
          可以使用登录页面，或使用登录弹窗。在 NextAuth 的能力之外，实现了 Google V2
          版本的快捷登录，以及微信登录接入。
        </p>
      </header>
      <p className='mb-2 text-sm font-semibold text-blue-600'>Modal</p>
      <h2 className='mb-2 text-lg font-bold text-gray-800 dark:text-white'>弹窗登录</h2>
      <div className='mb-10 flex justify-center'>
        <LoginModal />
      </div>
      <p className='mb-2 text-sm font-semibold text-blue-600'>Page</p>
      <h2 className='mb-2 text-lg font-bold text-gray-800 dark:text-white'>页面登录</h2>
      <div className='mx-auto mt-7 max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800'>
        <div className='p-4 sm:p-7'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
