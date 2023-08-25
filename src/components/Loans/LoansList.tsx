import { Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import theme from '../../theme/theme';
import { useLoanTabs } from '../../hooks';
import SwipeableViews from 'react-swipeable-views';
import { TabPanel } from '../TabPannel';
import { LoanRow } from './LoanRow';
import { LoanListHeader } from './LoanListHeader';
import { LoanTabs } from './LoanTabs';

const LOAN_TAB_PANEL_ID = 'LOAN_TAB_PANEL_NAME';

const LoansList = (): JSX.Element => {
  const loanTabs = useLoanTabs();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleChangeTabIndex = (index: number) => {
    setCurrentTabIndex(index);
  };

  return (
    <>
      <Typography variant='h2' sx={{ marginBottom: 8 }}>
        Financing
      </Typography>
      {loanTabs.length === 0 ? (
        <Typography
          data-testid='no-items-message'
          variant='h4'
          sx={{ marginBottom: 8 }}
        >
          There&apos;s nothing to show here
        </Typography>
      ) : (
        <>
          <LoanTabs
            loanTabs={loanTabs}
            loanTabId={LOAN_TAB_PANEL_ID}
            currentTabIndex={currentTabIndex}
            handleChangeTabIndex={handleChangeTabIndex}
          />
          <LoanListHeader />
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={currentTabIndex}
            onChangeIndex={handleChangeTabIndex}
          >
            {loanTabs.map((tab, index) => (
              <TabPanel
                key={tab.status}
                name={LOAN_TAB_PANEL_ID}
                value={currentTabIndex}
                index={index}
                dir={theme.direction}
              >
                {tab.loanRequests.map((loanRequest) => (
                  <LoanRow
                    data-testid={`tab-${loanRequest.status}`}
                    key={loanRequest.id}
                    isMobile={isMobile}
                    loanRequest={loanRequest}
                  />
                ))}
              </TabPanel>
            ))}
          </SwipeableViews>
        </>
      )}
    </>
  );
};

export default LoansList;
