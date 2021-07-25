import { Link } from '@chakra-ui/react';

export interface NameMailComponentProps {
  name?: string;
  email?: string;
}

export default function NameMailComponent({ name, email }: NameMailComponentProps) {
  return (
    <>
      {name}
      <Link href={`mailto:${email}`} ml="2">
        ({'✉'} {email})
      </Link>
    </>
  );
}
