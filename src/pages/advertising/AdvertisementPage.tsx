import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { AccessDeniedEmptyState } from '../../components/EmptyStates';
import RequireRoles from '../../components/RequireRoles';
import AdvertisementOverviewPage from './AdvertisementOverviewPage';
import AdvertisementUserListPage from './AdvertisementUserListPage';

export default function AdvertisementPage() {
  return (
    <RequireRoles roles={['admin', 'advertiser']} fallback={<AccessDeniedEmptyState />}>
      <DefaultPageLayout header="Advertisement">
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab>Your Ads</Tab>
            <Tab>Job Candidates</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AdvertisementOverviewPage />
            </TabPanel>
            <TabPanel>
              <AdvertisementUserListPage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DefaultPageLayout>
    </RequireRoles>
  );
}
