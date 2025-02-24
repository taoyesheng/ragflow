import { useFetchUserInfo } from '@/hooks/user-setting-hooks';
import { Avatar } from 'antd';
import React from 'react';
import { history } from 'umi';

import styles from '../../index.less';

const App: React.FC = () => {
  const { data: userInfo } = useFetchUserInfo();

  const toSetting = () => {
    // todo 临时增加用户权限划分 普通用户禁止查看
    let userType: string = localStorage.getItem('userType') || 'adminUser';
    if (userType === 'user') return;
    // end

    history.push('/user-setting');
  };

  return (
    <Avatar
      size={32}
      onClick={toSetting}
      className={styles.clickAvailable}
      src={
        userInfo.avatar ??
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    />
  );
};

export default App;
