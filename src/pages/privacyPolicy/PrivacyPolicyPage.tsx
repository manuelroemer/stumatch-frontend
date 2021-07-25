import DefaultPageLayout from '../../components/DefaultPageLayout';
import { Button, Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { routes } from '../../constants';

export function PrivacyPolicyPage() {
  return (
    <DefaultPageLayout
      header="sTUMatch's Privacy Policy"
      subHeader={'Last updated: ' + new Date().toLocaleDateString()}>
      <Text>
        Our Company is part of the Our Company Group which includes Our Company International and Our Company Direct.
        This privacy policy will explain how our organization uses the personal data we collect from you when you use
        our website.{' '}
      </Text>
      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          Topics:
        </Heading>
        <UnorderedList ml="10" mb="4" mt="4">
          <ListItem> What data do we collect?</ListItem>
          <ListItem>How do we collect your data?</ListItem>
          <ListItem>How will we use your data?</ListItem>
          <ListItem>Marketing What are your data protection rights?</ListItem>
          <ListItem>How to contact us? </ListItem>
        </UnorderedList>
      </Text>
      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          What data do we collect?
        </Heading>
        <p>Our Company collects the following data:</p>
        <UnorderedList ml="10" mb="4" mt="4">
          <ListItem> Personal identification information (Name, email address, faculty, study program, etc.)</ListItem>
        </UnorderedList>
      </Text>

      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          How do we collect your data?
        </Heading>
        <p>
          You directly provide Our Company with most of the data we collect. We collect data and process data when you:
        </p>
        <UnorderedList ml="10" mb="4" mt="4">
          <ListItem> Register online</ListItem>
          <ListItem>
            Voluntarily complete a customer survey or provide feedback on any of our message boards or via email.
          </ListItem>
          <ListItem>Use or view our website via your browser’s cookies.</ListItem>
        </UnorderedList>
      </Text>
      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          How will we use your data?
        </Heading>
        <p>Our Company collects your data so that we can: </p>
        <UnorderedList ml="10" mb="4" mt="4">
          <ListItem> Manage your account.</ListItem>
        </UnorderedList>
        <p>
          Our Company will share your data with our partner companies so that they may offer you their products and
          services.
        </p>
      </Text>
      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          What are your data protection rights?
        </Heading>
        <p>
          Our Company would like to make sure you are fully aware of all of your data protection rights. Every user is
          entitled to the following:{' '}
        </p>
        <UnorderedList ml="10" mb="4" mt="4">
          <ListItem>
            {' '}
            The right to access – You have the right to request Our Company for copies of your personal data.
          </ListItem>
          <ListItem>
            {' '}
            The right to rectification – You have the right to request that Our Company correct any information you
            believe is inaccurate. You also have the right to request Our Company to complete the information you
            believe is incomplete.
          </ListItem>
          <ListItem>
            {' '}
            The right to erasure – You have the right to request that Our Company erase your personal data, under
            certain conditions.
          </ListItem>
          <ListItem>
            {' '}
            The right to restrict processing – You have the right to request that Our Company restrict the processing of
            your personal data, under certain conditions.
          </ListItem>
        </UnorderedList>
      </Text>

      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          How to contact us?
        </Heading>
        <p>
          If you have any questions about Our Company’s privacy policy, the data we hold on you, or you would like to
          exercise one of your data protection rights, please do not hesitate to contact us.
        </p>
        <UnorderedList ml="10" mb="4" mt="4">
          <ListItem>
            Contact:{' '}
            <Link to={routes.contact}>
              <Button variant="link" colorScheme="primary">
                Contact formular
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            Email:
            <Link href={`mailto:stumatch@stumatch.de`} ml="2">
              <Button variant="link" colorScheme="primary">
                stumatch@stumatch.de
              </Button>
            </Link>
          </ListItem>
        </UnorderedList>
      </Text>
    </DefaultPageLayout>
  );
}
