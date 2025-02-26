import {StyleSheet} from 'react-native';
import {COLORS} from 'styles/theme';

export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 30,
      gap: 30,
      paddingBottom: 100,
    },
    header: {
      backgroundColor: COLORS.cream,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 20,
      gap: 10,
      marginTop: 20,
    },
    iconContainer: {
      alignItems: 'center',
    },
    icon: {
      width: 50,
      height: 50,
      resizeMode: 'cover',
      position: 'absolute',
      top: -40,
    },
    color: {
      color: COLORS.black,
    },
    accountInfoContainer: {
      alignItems: 'center',
      marginTop: 10,
    },
    accountSubTitleContainer: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    balanceText: {
      fontSize: 60,
    },
    addBalanceButton: {},
    addBalanceButtonIcon: {
      resizeMode: 'cover',
    },
    addBalanceButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    transactionCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      backgroundColor: COLORS.silverGray,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
    },
    leftWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
    amountTypeIconWrapper: {
      backgroundColor: COLORS.green,
      borderRadius: '50%',
      padding: 10,
    },
    amountTypeIcon: {
      width: 30,
      height: 30,
      tintColor: COLORS.cream,
    },
    add: {
      transform: [{rotate: '-90deg'}],
    },
    spending: {
      transform: [{rotate: '90deg'}],
    },
    infoWrapper: {
      alignItems: 'flex-end',
    },
  });
