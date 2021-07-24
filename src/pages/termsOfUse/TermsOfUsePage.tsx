import DefaultPageLayout from '../../components/DefaultPageLayout';
import { Button, Heading, ListItem, OrderedList, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { routes } from '../../constants';

export function TermsOfUsePage() {
  return (
    <DefaultPageLayout header="Terms and Conditions" subHeader={'Last updated: ' + new Date().toLocaleDateString()}>
      <Text>
        Please read these Terms and Conditions carefully before using the http://www.sTUMatch.com website and operated
        by our company sTUMatch. Your access to and use of the Service is conditioned on your acceptance of and
        compliance with these Terms. These Terms apply to all users and others who access or use the Service. By
        accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms
        then you may not access the Service.
      </Text>

      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          Condition of use
        </Heading>
        <p>
          As a condition of use, you promise not to use ther Services for any purpose that is unlawful or prohibited by
          these Terms, or any other purpose not reasonably intended by sTUMatch.{' '}
        </p>
        By way of example, and not as a limitation, you agree not to use the Services:
      </Text>

      <OrderedList ml="10" mb="4" mt="4">
        <ListItem>To abuse, harass, threaten, impersonate or intimidate any person. </ListItem>
        <ListItem>
          to post or transmit, or cause to be posted or transmitted, any Content that is libelous, defamatory, obscene,
          pornographic, abusive, offensive, profane, or that infringes any copyright or other right of any person;{' '}
        </ListItem>
        <ListItem>
          To communicate with sTUMatch representatitves or other users in an abusive or offensive manner;{' '}
        </ListItem>
        <ListItem>
          For any purpose (including posting or viewing Content) that is not permitted under the laws of the
          jurisdicition where you use the Services.{' '}
        </ListItem>
        <ListItem>
          To post or transmit, or cause to be posted or transmitted, any Communication designed or intended to obtain
          password, account, or private information from sTUMatch user;{' '}
        </ListItem>
        <ListItem>To create or transmit unwanted spam to any person or any URL; </ListItem>
        <ListItem>To create multiple accounts for the purpose of votin for or agains users visual content; </ListItem>
        <ListItem>
          To post copyrighted content that does not belong to you, unless you are commenting on visual content in blogs,
          where you may post such content subject to providing appropriate attribution to the copyright owner and a link
          to the source of the content.{' '}
        </ListItem>
      </OrderedList>
      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          Content
        </Heading>
        Our Service allows you to post, link, store, share and otherwise make available certain information, text,
        graphics, videos, or other material. You are responsible for the content.
      </Text>
      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          Subscriptions
        </Heading>
        Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring ...
        TODO
      </Text>

      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          Links To Other Web Sites
        </Heading>
        Our Service may contain links to third-party web sites or services that are not owned or controlled by sTUMatch.
        sTUMatch has no control over, and assumes no responsibility for, the content, privacy policies, or practices of
        any third party web sites or services. You further acknowledge and agree that sTUMatch shall not be responsible
        or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection
        with use of or reliance on any such content, goods or services available on or through any such web sites or
        services.
      </Text>
      <Text>
        <Heading as="h2" size="md" mt="10" mb="4">
          Contact Us
        </Heading>
        If you have any questions about these Terms, please{' '}
        <Link to={routes.contact}>
          {' '}
          <Button variant="link" colorScheme="primary">
            contact us{' '}
          </Button>
        </Link>
        .
      </Text>
    </DefaultPageLayout>
  );
}
