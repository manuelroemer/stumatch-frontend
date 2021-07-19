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
  postPage: '/feed/:postId',
  friendsList: '/friends',
  contact: '/contact',
} as const;
