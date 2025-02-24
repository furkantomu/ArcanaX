import {useAppDispatch, useAppSelector} from '@/hooks';
import {authActions} from '@/store/auth/authActions';
import React, {useEffect} from 'react';

import Header from './components/Header';
import SettingsMenu from './SettingsMenu';

const ProfileWrapper = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (user && user.id) {
      dispatch(authActions.user({id: user.id, email: user.email}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      <SettingsMenu />
    </>
  );
};

export default ProfileWrapper;
