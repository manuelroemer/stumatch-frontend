import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import AccessDenied from '../../components/AccessDenied';
import RequireRoles from '../../components/RequireRoles';

export default function AdministrationPage() {
  return (
    <RequireRoles roles="admin" fallback={<AccessDenied />}>
      <Flex justify="center" mt="12">
        <Box w="70%">
          <Heading as="h1">Administration</Heading>
          <Text>Todo.</Text>
        </Box>
      </Flex>
    </RequireRoles>
  );
}
