import { Button } from '@chakra-ui/react';
import { useUserStore } from '../../stores/userStore';

export default function FeedPage() {
  const logout = useUserStore((state) => state.logout);
  return (
    <>
      <h1>Hello from the feed!</h1>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
