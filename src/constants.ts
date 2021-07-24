export const routes = {
  root: '/',
  feed: '/feed',
  matching: '/matching',
  advertising: '/advertising',
  advertisementPage: '/advertising/:advertisementId',
  administration: '/administration',
  notifications: '/notifications',
  chat: '/chat',
  chatGroup: '/chat/:chatGroupId?',
  profile: '/profile',
  postPage: '/feed/:postId',
  friendsList: '/friends',
  contact: '/contact',
  termsOfUse: '/terms',
  privacyPolicy: '/privacyPolicy',
} as const;

export const emailRegex = /^\S+@\S+\.\S+$/;
