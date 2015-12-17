'use strict';

var ipc = require('electron').ipcRenderer;
var NativeNotification = Notification;
var unreadChats;
var starred;
var channels;

ipc.on('check-unread', () => {
  unreadChats = document.getElementsByClassName('unread');
  if (unreadChats.length == 0) {
    console.log('clearing');
    ipc.send('clear-notification');
  } else {
    console.log('new');
    ipc.send('new-notification');
  }
});

Notification = function (title, options) {
  var notification = new NativeNotification(title, options);

  ipc.send('new-notification');

  notification.addEventListener('click', () => {
    ipc.send('notification-click');
  });

  return notification;
};

Notification.prototype = NativeNotification.prototype;
Notification.permission = NativeNotification.permission;
Notification.requestPermission = NativeNotification.requestPermission.bind(Notification);
