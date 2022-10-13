import Constants from 'expo-constants'
import * as Persmissions from 'expo-permissions'
import * as Notifications from 'expo-notifications';
import Platform from 'react-native';
import React, { setState, useState, useEffect } from 'react';

class UserPermissions {
    getCameraPermission = async () => {
        if(Constants.platform.ios) {
            const [status] = await Permissions.askAsync(Persmissions.MEDIA_LIBRARY)

            if(status != "granted") {
                alert("Enable camera roll access?")
            }
        }
    }
    registerForPushNotificationsAsync = async () => {
          const { status: existingStatus } = await Notifications.getPermissionsAsync().catch();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync().catch();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
              name: 'default',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
              lightColor: '#FF231F7C',
            });
          return token;
        }
      };
}

export default new UserPermissions();