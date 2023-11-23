'use client';

import { FC, useState } from 'react';
import { Button } from 'preline-react/lib/button';
import { Modal } from 'preline-react';
import { LoginForm } from './LoginForm';

export const LoginModal: FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开登录弹窗</Button>
      <Modal
        size='custom'
        className='min-w-[260px] max-w-md p-4 pb-6'
        visible={open}
        footer={false}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <LoginForm />
      </Modal>
    </>
  );
};
