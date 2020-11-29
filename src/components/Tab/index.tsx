import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';

const Tab: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
  position,
}) => {
  const { darkMode } = useSelector(
    (stateReducer: RootState) => stateReducer.options,
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: darkMode ? '#242238' : '#343152',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        let label = options?.tabBarLabel;

        if (!label) {
          label = options?.title ? options.title : route.name;
        }

        const isFocused = state.index === index;

        const onPress = (): void => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = (): void => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });
        const borderWidth = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 2 : 0)),
        });
        const borderRadius = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 15 : 10)),
        });

        return (
          <TouchableWithoutFeedback
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: 65,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 65,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Animated.Text
                numberOfLines={1}
                style={{
                  borderWidth,
                  borderColor: isFocused ? '#fff' : 'transparent',
                  opacity,
                  fontSize: 14,
                  fontWeight: 'bold',
                  letterSpacing: 1.19,
                  backgroundColor: '#DE595C',
                  width: '85%',
                  paddingVertical: 12,
                  textAlign: 'center',
                  borderRadius,
                  color: isFocused ? '#fff' : '#9999',
                }}
              >
                {label}
              </Animated.Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default Tab;
