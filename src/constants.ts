export const routes = {
  root: '/',
  feed: '/feed',
  matching: '/matching',
  advertising: '/advertising',
  administration: '/administration',
  notifications: '/notifications',
  chat: '/chat',
  chatGroup: '/chat/:chatGroupId?',
  postPage: '/feed/:postId',
  friendsList: '/friends',
  contact: '/contact',
} as const;

export const emailRegex = /^\S+@\S+\.\S+$/;
