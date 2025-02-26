import { Domain } from '@/constants/common';
import { useTranslate } from '@/hooks/common-hooks';
import { useLogout } from '@/hooks/login-hooks';
import { useSecondPathName } from '@/hooks/route-hook';
import { useFetchSystemVersion } from '@/hooks/user-setting-hooks';
import type { MenuProps } from 'antd';
import { Flex, Menu } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'umi';
import { UserSettingBaseKey, UserSettingIconMap } from '../constants';

// todo 临时增加角色
let userType: string = localStorage.getItem('userType') || 'adminUser';

interface pages {
  Profile: string;
  Password?: string | undefined;
  Model?: string | undefined;
  System?: string | undefined;
  Api?: string | undefined;
  Team: string;
  Logout: string;
}

let UserSettingRouteKey: pages;
if (userType === 'user') {
  UserSettingRouteKey = {
    Profile: 'profile',
    Team: 'team',
    Logout: 'logout',
  };
} else {
  UserSettingRouteKey = {
    Profile: 'profile',
    Password: 'password',
    Model: 'model',
    System: 'system',
    Api: 'api',
    Team: 'team',
    Logout: 'logout',
  };
}
// end

import styles from './index.less';

type MenuItem = Required<MenuProps>['items'][number];

const SideBar = () => {
  const navigate = useNavigate();
  const pathName = useSecondPathName();
  const { logout } = useLogout();
  const { t } = useTranslate('setting');
  const { version, fetchSystemVersion } = useFetchSystemVersion();

  useEffect(() => {
    if (location.host !== Domain) {
      fetchSystemVersion();
    }
  }, [fetchSystemVersion]);

  function getItem(
    label: string,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label: (
        <Flex justify={'space-between'}>
          {t(label)}
          <span className={styles.version}>
            {label === 'system' && version}
          </span>
        </Flex>
      ),
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = Object.values(UserSettingRouteKey).map((value) =>
    getItem(value, value, UserSettingIconMap[value]),
  );

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === UserSettingRouteKey.Logout) {
      logout();
    } else {
      navigate(`/${UserSettingBaseKey}/${key}`);
    }
  };

  const selectedKeys = useMemo(() => {
    return [pathName];
  }, [pathName]);

  return (
    <section className={styles.sideBarWrapper}>
      <Menu
        selectedKeys={selectedKeys}
        mode="inline"
        items={items}
        onClick={handleMenuClick}
        style={{ width: 312 }}
      />
    </section>
  );
};

export default SideBar;
