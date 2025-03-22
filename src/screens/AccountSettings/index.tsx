import React, {useEffect} from 'react';
import {ScrollView, SafeAreaView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {CustomHeader} from '@/components';
import {COLORS} from '@/styles/theme';
import {getStyles} from './styles';
import List from './components/List';
import DeleteAccount from './components/DeleteAccount';

const AccountSettings = () => {
  const navigation = useNavigation();
  const styles = getStyles();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: '#f5f5dc4f',
          position: 'absolute',
          marginHorizontal: 30,
          marginBottom: 20,
          borderTopWidth: 0,
          height: 50,
          borderBottomWidth: 0,
          borderRadius: 50,
          elevation: 0,
        },
      });
  }, [navigation]);
  return (
    <>
      <LinearGradient colors={[COLORS.black, '#3F2305']} style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView>
            <CustomHeader leftIcon={true} title={false} rightIcon={false} />
            <View style={styles.settingsMenuItem}>
              <List />
              <DeleteAccount />
            </View>
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default AccountSettings;
