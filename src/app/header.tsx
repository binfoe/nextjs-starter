import { FC, Suspense } from 'react';
import { BsGithub, BsMoon } from 'react-icons/bs';
import { TbBrandNextjs } from 'react-icons/tb';
import { auth } from '@server/service/auth';

async function User() {
  const session = await auth();
  const user = session?.user;
  return user ? user.name || user.email : 'Not Login';
}
export const Header: FC = () => {
  return (
    <header className='sticky inset-x-0 top-0 flex h-[70px] w-full flex-wrap border-b bg-white py-2.5 text-sm dark:border-gray-700 dark:bg-slate-900 sm:flex-nowrap sm:justify-start sm:py-4'>
      <nav
        className='mx-auto flex w-full basis-full flex-nowrap items-center px-4 sm:px-6 md:px-8 lg:max-w-[90rem]'
        aria-label='Global'
      >
        <a
          className='flex flex-none items-center rounded-md text-blue-600 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
          href='/'
        >
          <TbBrandNextjs className='text-3xl' />
          <span className='ml-2 text-2xl'>Next JS Starter</span>
        </a>

        <div className='flex flex-1 justify-end'>
          <Suspense fallback={null}>
            <User />
          </Suspense>
        </div>
        <div className='space-x-1 ps-2'>
          <a
            className='inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-medium text-gray-800 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
            href='https://github.com/binfoe/nextjs-starter'
            target='_blank'
          >
            <BsGithub />
          </a>
          <button className='inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-medium text-gray-800 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'>
            <BsMoon />
          </button>
        </div>
      </nav>
    </header>
  );
};
