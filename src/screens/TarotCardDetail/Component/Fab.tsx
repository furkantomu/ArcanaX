import {Typography} from '@/components';
import {COLORS, SIZES} from '@/styles/theme';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageURISource,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTarotDetailContext} from '../TarotDetailScreenContext';
import {useAppSelector} from '@/hooks';

interface ListItemProps {
  id: number;
  icon: ImageURISource;
  name: string;
  engName?: string;
  category?: string;
}

const list: ListItemProps[] = [
  {
    id: 0,
    icon: require('../../../../assets/icon/major.png'),
    name: 'Majör Arkana',
    engName: 'Major Arcana',
    category: 'major',
  },
  {
    id: 1,
    icon: require('../../../../assets/icon/cups.png'),
    name: 'Kupalar',
    engName: ' Cups',
    category: 'cups',
  },
  {
    id: 2,
    icon: require('../../../../assets/icon/wands.png'),
    name: 'Asalar',
    engName: 'Wands',
    category: 'wands',
  },
  {
    id: 3,
    icon: require('../../../../assets/icon/pentacles.png'),
    name: 'Tılsımlar',
    engName: 'Pentacles',
    category: 'pentacles',
  },
  {
    id: 4,
    icon: require('../../../../assets/icon/swords.png'),
    name: 'Kılıçlar',
    engName: 'Swords',
    category: 'swords',
  },
  {id: 5, icon: require('../../../../assets/icon/plus.png'), name: 'Close'},
];

const {width: WIDTH} = Dimensions.get('window');
const PLUS_BUTTON_WIDTH = 80;
const BUTTON_WIDTH = 80;

const ListItem = ({
  item,
  active,
  handleCategorySelect,
  selectedItem,
}: {
  item: ListItemProps;
  active: boolean;
  handleCategorySelect: (item: ListItemProps) => void;
  selectedItem: ListItemProps;
}) => {
  const rotate = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(rotate.value, [0, 180], [0, 1]),
      transform: [
        {translateX: SIZES.width / 3.3},
        {translateY: 0},
        {rotate: `${(rotate.value / 6) * item.id}deg`},
        {translateX: -translateX.value},
        {translateY: 0},
      ],
    };
  });

  React.useEffect(() => {
    function runAnimation() {
      'worklet';
      if (active) {
        rotate.value = withDelay(
          100 * item.id,
          withTiming(360, {duration: 800}),
        );
        translateX.value = withDelay(
          100 * item.id,
          withTiming(120, {duration: 800}),
        );
      } else {
        rotate.value = withDelay(100 * item.id, withTiming(0, {duration: 800}));
        translateX.value = withDelay(
          100 * item.id,
          withTiming(0, {duration: 800}),
        );
      }
    }

    runAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <Animated.View style={[styles.listItem, rStyle]}>
      <LinearGradient
        colors={[
          selectedItem.id === item.id ? '#b69b65' : '#967126',
          '#b69b65',
          selectedItem.id === item.id ? '#b69b65' : '#967126',
        ]}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0}}
        end={{x: 0.2, y: 1}}
      />
      <TouchableOpacity
        style={{zIndex: 40}}
        onPress={() => {
          handleCategorySelect(item);
        }}>
        <Image
          source={item.icon}
          style={[
            styles.listItemIcon,
            {transform: [{rotate: `${(360 / -6) * item.id}deg`}]},
          ]}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

function Fab() {
  const {getFilteredTarotCards, setCards} = useTarotDetailContext();
  const {localeValue} = useAppSelector(state => state.settings);
  const rotate = useSharedValue(0);
  const [active, setActive] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<ListItemProps>({
    id: 0,
    icon: require('../../../../assets/icon/plus.png'),
    name: '',
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(`${rotate.value}deg`, {duration: 1200}),
        },
      ],
    };
  });

  const onPress = () => {
    'worklet';
    if (rotate.value === 0) {
      rotate.value = 315;
    } else {
      rotate.value = 0;
    }
    runOnJS(setActive)(!active);
  };

  const handleCategorySelect = (item: ListItemProps) => {
    if (item.name === 'Close') {
      rotate.value = 0;
      runOnJS(setActive)(false);
      return;
    }
    setCards([]);
    setTimeout(() => {
      getFilteredTarotCards(item.category || '');
    }, 300);
    setSelectedItem(item);
    ('worklet');
    if (rotate.value === 0) {
      rotate.value = 0;
    } else {
      rotate.value = 0;
    }
    runOnJS(setActive)(!active);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={rStyle}>
          <TouchableOpacity style={styles.plusButton} onPress={onPress}>
            <Image source={selectedItem.icon} style={styles.plusIcon} />
          </TouchableOpacity>
        </Animated.View>
        <Typography style={{marginTop: 10}}>
          {selectedItem?.name
            ? localeValue === 'tr'
              ? selectedItem.name
              : selectedItem.engName
            : localeValue === 'tr'
            ? 'Kategori Seç'
            : 'Select Category'}
        </Typography>
        {list.map(item => (
          <ListItem
            key={item.id}
            item={item}
            active={active}
            selectedItem={selectedItem}
            handleCategorySelect={handleCategorySelect}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

export default Fab;

const styles = StyleSheet.create({
  container: {
    zIndex: 40,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
    alignSelf: 'center',
    position: 'absolute',
    top: 20,
  },
  plusButton: {
    width: PLUS_BUTTON_WIDTH,
    height: PLUS_BUTTON_WIDTH,
    borderRadius: PLUS_BUTTON_WIDTH / 2,
    backgroundColor: '#967126',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#d1a00b',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.32,
    shadowRadius: 4.22,
    elevation: 3,
    overflow: 'hidden',
  },
  plusIcon: {
    width: PLUS_BUTTON_WIDTH - 40,
    height: PLUS_BUTTON_WIDTH - 40,
    tintColor: COLORS.white,
  },
  listItem: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: WIDTH / 10,

    shadowColor: '#d1a00b',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.32,
    shadowRadius: 4.22,
    elevation: 3,
    overflow: 'hidden',
  },
  listItemIcon: {
    width: BUTTON_WIDTH - 40,
    height: BUTTON_WIDTH - 40,
    tintColor: COLORS.white,
  },
  linearGradient: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    position: 'absolute',
  },
});
