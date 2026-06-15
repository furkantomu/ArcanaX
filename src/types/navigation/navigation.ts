export type NumerologyDetail = {
  name: string;
  birthDate: string;
  lifePath: number;
  expression: number;
  personalYear: number;
  radicalNumber: number;
  checkSpecificNumber: boolean;
};

export type RootStackParamList = {
  HomeScreen: undefined;
  TarotScreen: undefined;
  TarotDetail: undefined;
  TarotCardDetail: {id: string | number; category: string};
  TarotSpreadScreen: {type?: string | number; name?: string; price?: string};
  NumerologyScreen: undefined;
  NumerologyDetailScreen: {numerologyDetail: NumerologyDetail};
  NumerologyPremiumScreen: {numerologyDetail: NumerologyDetail};
  DreamScreen: undefined;
  DreamPremiumScreen: undefined;
  ProfileScreen: undefined;
  ProfileUserScreen: undefined;
  ProfilePasswordScreen: undefined;
  SaveServicesScreen: undefined;
  TarotHistoryScreen: {type: string; id: string};
  NumerologyHistoryScreen: {type: string; id: string};
  DreamHistoryScreen: {id: string};
  BalanceScreen: undefined;
  FAQScreen: undefined;
  AccountSettings: undefined;
  PurchasingScreen: undefined;
  TabHomeScreen: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
