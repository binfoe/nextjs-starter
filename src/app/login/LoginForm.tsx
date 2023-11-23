'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Checkbox } from 'preline-react/lib/checkbox';
import { Toast } from 'preline-react/lib/toast';
import { FC, useEffect, useState } from 'react';

const LOGIN_AGREE_KEY = 'login.agree';
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
async function loginWithGoogle() {
  if (!window.google) {
    const $s = document.createElement('script');
    $s.src = 'https://accounts.google.com/gsi/client';
    document.head.appendChild($s);
    while (!window.google) {
      await new Promise((res) => {
        setTimeout(res, 300);
      });
    }
  }
  window.google.accounts.id.initialize({
    ux_mode: 'popup',
    client_id: GOOGLE_CLIENT_ID,
    callback: (info: { credential: string }) => {
      signIn('googleonetap', {
        credential: info.credential,
        redirect: false,
      }).catch((ex) => {
        console.error(ex);
      });
    },
    // native_callback(...args: unknown[]) {
    //   // eslint-disable-next-line no-console
    //   console.log(...args);
    // },
  });
  window.google.accounts.id.prompt(
    (notification: { isNotDisplayed: () => boolean; isSkippedMoment: () => boolean }) => {
      console.log(notification);
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // continue with another identity provider.
        signIn('google');
      } else {
      }
    },
  );
}

async function loginWithWechat() {}
export const LoginForm: FC = () => {
  const [agree, setAgree] = useState(false);
  const [logining, setLogining] = useState(false);
  useEffect(() => {
    setAgree(!!localStorage?.getItem(LOGIN_AGREE_KEY));
  }, []);

  const login = async (type: string) => {
    if (!agree) {
      Toast.warn('请先阅读并同意用户条款');
      return;
    }
    setLogining(true);
    if (type === 'google') {
      await loginWithGoogle();
    } else if (type === 'wechat') {
      await loginWithWechat();
    } else {
      signIn(type);
    }
  };
  return (
    <div>
      <div className='flex flex-col gap-y-4'>
        <div className='text-center'>
          <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>登录</h1>
          <p className='mt-2 text-sm text-gray-400 dark:text-gray-400'>
            首次登录将自动为您注册账号
          </p>
        </div>
        <button
          type='button'
          disabled={logining}
          onClick={() => login('wechat')}
          className='inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
        >
          <Image alt='wechat' src='/wechat.png' width={16} height={16} />
          <span className='w-[112px] text-left'>使用微信登录</span>
        </button>
        <button
          type='button'
          disabled={logining}
          onClick={() => login('google')}
          className='inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
        >
          <Image alt='google' src='/google.svg' width={16} height={16} />
          <span className='w-[112px] text-left'>使用谷歌登录</span>
        </button>
        <button
          type='button'
          disabled={logining}
          onClick={() => {
            login('github');
          }}
          className='inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
        >
          <Image alt='github' src='/github-mark.svg' width={16} height={16} />
          <span className='w-[112px] text-left'>使用Github登录</span>
        </button>
        <Checkbox
          value={agree}
          disabled={logining}
          onChange={(v) => {
            setAgree(v);
            localStorage.setItem(LOGIN_AGREE_KEY, v ? 'true' : '');
          }}
        >
          我已阅读<a className='text-blue-500'>《用户条款》</a>，理解并同意该条款。
        </Checkbox>
      </div>
    </div>
  );
};
