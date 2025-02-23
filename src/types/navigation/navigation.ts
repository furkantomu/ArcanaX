type NumerologyDetail = {
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
  TarotSpreadScreen: {type: string; name: string};
  NumerologyScreen: undefined;
  NumerologyDetailScreen: {numerologyDetail: NumerologyDetail};
  NumerologyPremiumScreen: {numerologyDetail: NumerologyDetail};
  DreamScreen: undefined;
  //CoffeeScreen: undefined;
};
