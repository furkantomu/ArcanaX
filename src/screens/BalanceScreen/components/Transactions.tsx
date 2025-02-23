import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import dayjs from 'dayjs';

import {Icon, Typography} from '@/components';

import {apiService} from '@/services/APIService';

import {useAppSelector} from '@/hooks';

import { TransactionsResponse } from '@/types/service';

import { COLORS } from '@/styles/theme';
import {getStyles} from '../styles';

const Transactions = () => {
  const {user} = useAppSelector(state => state.auth);
  const [transactions, setTransactions] = useState([
    {
      id: '',
      status: '',
      amount: 0,
      balance: 0,
      createdAt: '',
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const response = await apiService.get<TransactionsResponse>(
          `token/transactions-detail/${user?.id}`,
        );
        if (response.data) {
          setTransactions([...response.data]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const styles = getStyles();
  return (
    <View style={styles.header}>
     {loading ? (
  <ActivityIndicator />
) : transactions.length > 0 ? (
  transactions.map((item, idx) => (
    <View style={styles.transactionCard} key={idx}>
      <View style={styles.leftWrapper}>
        <View style={styles.amountTypeIconWrapper}>
          <Icon
            name="rightArrow"
            style={[
              styles.amountTypeIcon,
              item.balance < 0 ? styles.spending : styles.add,
            ]}
          />
        </View>
        <View>
          <Typography
            weight="NotoSerifCondensedBoldItalic"
            style={styles.color}>
            {item.balance < 0 ? 'Harcama' : 'Yükleme'}
          </Typography>
          <Typography style={styles.color}>
            {dayjs(item.createdAt).format('DD MMMM YYYY HH:mm')}
          </Typography>
        </View>
      </View>
      <View style={styles.infoWrapper}>
        <Typography size="large" style={styles.color}>
          {item.balance}
        </Typography>
        <Typography size="medium" style={styles.color}>
          ₺{item.amount}
        </Typography>
      </View>
    </View>
  ))
) : (
  <Typography style={{color: COLORS.blackOpacity1}}>İşlem geçmişi bulunmuyor.</Typography>
)}

    </View>
  );
};

export default Transactions;
