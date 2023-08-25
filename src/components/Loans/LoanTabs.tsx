import React, { PropsWithChildren } from 'react';
import { Box, Chip, Tab, Tabs, Typography } from '@mui/material';
import { LoanRequestTab } from '../../usecases/loanRequests';

type LoanTabsProps = {
  currentTabIndex: number;
  handleChangeTabIndex: (index: number) => void;
  loanTabs: LoanRequestTab[];
  loanTabId: string;
};

export const LoanTabs = ({
  currentTabIndex,
  handleChangeTabIndex,
  loanTabs,
  loanTabId,
}: PropsWithChildren<LoanTabsProps>): JSX.Element => {
  return (
    <Tabs
      value={currentTabIndex}
      onChange={(e, value) => handleChangeTabIndex(value)}
      aria-label='loans-request-tabs'
      data-testid='loan-request-tabs'
      variant='scrollable'
      scrollButtons='auto'
      allowScrollButtonsMobile
    >
      {loanTabs.map((tab, index) => (
        <Tab
          key={tab.status}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Typography sx={{ fontSize: 12 }}>{tab.label}</Typography>
              <Chip
                sx={{ fontSize: 12 }}
                label={tab.count}
                size='small'
                color='primary'
              />
            </Box>
          }
          id={`${loanTabId}-${index}`}
          aria-controls={`${loanTabId}-${index}`}
        />
      ))}
    </Tabs>
  );
};
