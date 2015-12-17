'use strict';

var ipc = require('electron').ipcRenderer;
var NativeNotification = Notification;
var unreadChats;
var starred;
var channels;

function refreshChannelLists() {
  starred = document.getElementsByClassName('starred');
  channels = document.getElementsByClassName('channel');
  console.log(starred);
  console.log(channels);
  var i;
  for (i = 0; i < starred.length; i++) {
    starred[i].onclick = () => {
      console.log('clicked');
    };
  }
}

function createListener(object) {
  console.log(object);
  console.log('started');
  object.onclick = () => {
    console.log('clicked!');
  }
  console.log('finished');
}

ipc.on('loaded', () => {
  // var starred = document.getElementsByClassName('starred');
  // var channels = document.getElementsByClassName('channel');
  // var i;
  // for (i = 0; i < starred.length; i++) {
  //   createListener(starred[i]);
  // }
  // for (i = 0; i < channels.length; i++) {
  //   createListener(channels[i]);
  // }
  var channelList = document.getElementById('channel-list');
  channelList.onclick = () => {
    refreshChannelLists();
  };
  // var links = document.getElementsByClassName('channel_name');
  // console.log(links);
  // links[2].onclick = function () {
  //   console.log('clicked');
  // };
});

Notification = (title, options) => {
  var notification = new NativeNotification(title, options);

  ipc.send('change-icon');

  unreadChats = document.getElementsByClassName('unread');
  console.log(unreadChats);

  notification.addEventListener('click', () => {
    ipc.send('notification-click');
  });

  return notification;
};

Notification.prototype = NativeNotification.prototype;
Notification.permission = NativeNotification.permission;
Notification.requestPermission = NativeNotification.requestPermission.bind(Notification);
