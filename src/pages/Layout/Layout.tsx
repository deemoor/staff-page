import { Outlet } from 'react-router-dom';
import cls from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={cls.layout}>
      <main className={cls.content}>
        <Outlet />
      </main>
    </div>
  );
};