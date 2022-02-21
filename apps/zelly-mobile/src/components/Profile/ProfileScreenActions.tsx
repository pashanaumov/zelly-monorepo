import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';

const actions = [
  {
    icon: 'calculator',
    name: 'Рассчитать Ваш углеродный след',
    iconForeground: 'rgb(0, 118, 110)',
    iconBackground: 'rgb(239, 253, 250)',
    navLink: 'UserCarbonFootprint',
  },
  {
    icon: 'trending-up',
    name: 'Посмотреть тренды пользователей',
    iconForeground: 'rgb(127, 48, 201)',
    iconBackground: 'rgb(250, 245, 255)',
    navLink: 'UserTrends',
  },
  {
    icon: 'chatbubble-ellipses-outline',
    name: 'Перейти на форум',
    iconForeground: 'rgb(0, 107, 159)',
    iconBackground: 'rgb(240, 249, 255)',
    navLink: 'UserForums',
  },
  {
    icon: 'information-circle-outline',
    name: 'Читать информацию',
    iconForeground: 'rgb(163, 97, 24)',
    iconBackground: 'rgb(254, 252, 233)',
    navLink: 'UserEducation',
  },
];

export const ProfileScreenActions = () => {
  const navigation = useNavigation();

  function proceedToScreen(destination: string) {
    return () => {
      navigation.navigate(destination);
    };
  }

  return (
    <View style={styles.container}>
      {actions.map((action, index) => {
        return (
          <TouchableOpacity
            onPress={proceedToScreen(action.navLink)}
            key={'' + action.name + index}
            style={styles.actionItemContainer}>
            <>
              <View style={styles.iconContainer}>
                <View
                  style={[
                    styles.icon,
                    { backgroundColor: action.iconBackground },
                  ]}>
                  <Icon
                    name={action.icon}
                    style={[
                      styles.iconInner,
                      {
                        color: action.iconForeground,
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.sectionDescriptionContainer}>
                <Text numberOfLines={2} style={styles.sectionDescription}>
                  {action.name}
                </Text>
              </View>
            </>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    justifyContent: 'center',
  },

  actionItemContainer: {
    width: '48%',
    height: 100,
    borderRadius: 12,
    padding: 8,
    marginTop: 4,
    marginVertical: 2,
    marginHorizontal: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconContainer: {
    height: '30%',
  },
  icon: {
    height: 26,
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  iconInner: {
    fontSize: 18,
  },
  sectionDescriptionContainer: {
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '70%',
  },
  sectionDescription: {
    fontSize: 16,
    fontWeight: '500',
  },
});
