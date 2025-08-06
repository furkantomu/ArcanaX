import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '@/components';
import {COLORS} from '@/styles/theme';

interface CustomHeaderProps {
  leftIcon?: boolean;
  title?: boolean;
  rightIcon?: boolean;
  onBackPress?: () => void;
  headerTitle?: string;
}

interface ScreenWrapperProps {
  children: React.ReactNode;
  showHeader?: boolean;
  headerProps?: CustomHeaderProps;
  style?: object;
  safeArea?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  showHeader = true,
  headerProps,
  style,
  safeArea = true,
}) => {
  const Container = safeArea ? SafeAreaView : View;
  
  return (
    <Container style={[styles.container, style]}>
      {showHeader && <CustomHeader {...headerProps} />}
      <View style={styles.content}>
        {children}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;