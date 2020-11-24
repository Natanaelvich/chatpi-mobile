import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const Tab: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
  position,
}) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
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

        return (
          <RectButton
            key={index}
            rippleColor="#DE595C"
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
                backgroundColor: '#343152',
              }}
            >
              <Animated.Text
                numberOfLines={1}
                style={{
                  opacity,
                  fontSize: 14,
                  fontWeight: 'bold',
                  letterSpacing: 1.19,
                  backgroundColor: '#DE595C',
                  width: '85%',
                  paddingVertical: 12,
                  textAlign: 'center',
                  borderRadius: 20,
                  color: isFocused ? '#fff' : '#9999',
                }}
              >
                {label}
              </Animated.Text>
            </View>
          </RectButton>
        );
      })}
    </View>
  );
};

export default Tab;
