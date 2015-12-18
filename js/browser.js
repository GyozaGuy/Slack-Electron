'use strict';

var ipc = require('electron').ipcRenderer;
var NativeNotification = Notification;
var unreadChats;
var starred;
var channels;

ipc.on('check-unread', () => {
  unreadChats = document.getElementsByClassName('unread');
  if (unreadChats.length == 0) {
    ipc.send('clear-notification');
  } else {
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
