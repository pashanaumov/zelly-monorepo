import { useUserInfo } from '@zelly/core/hooks/useUserInfo';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../Common/Avatar/Avatar';
import { SubscriptText } from '../Common/Text/SubScriptText';

const { height } = Dimensions.get('window');

export const ProfileScreenInfoSection = () => {
  const { username } = useUserInfo();
  return (
    <View style={styles.profileInfoSection}>
      <View style={styles.profileInfoAvatar}>
        <Avatar />
      </View>
      <View style={styles.profileTextInfo}>
        <View>
          <Text style={styles.baseFont}>
            Welcome back, <Text style={styles.boldText}>{username}</Text>
            <Text> !</Text>
          </Text>
        </View>
        <View>
          <Text>
            CO<SubscriptText subscriptFontSize={10}>2</SubscriptText> с начала
            года: 20кг
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfoSection: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    height: height / 4,
    elevation: 12,
    flexDirection: 'row',
    borderRadius: 10,
  },
  profileInfoAvatar: {
    height: '100%',
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTextInfo: {
    height: '100%',
    flex: 0.7,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  baseFont: {
    fontSize: 24,
  },
  boldText: {
    fontWeight: '600',
  },
});
