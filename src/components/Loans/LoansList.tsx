import {
  Box,
  Card,
  Chip,
  Grid,
  Hidden,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import theme from '../../theme/theme';
import { useLoanTabs } from '../../hooks';
import SwipeableViews from 'react-swipeable-views';
import { TabPanel } from '../TabPannel';
import { LoanRow } from './LoanRow';
import useStyles from './LoansListStyles';

const LOAN_TAB_PANEL_NAME = 'LOAN_TAB_PANEL_NAME';

const LoansList = (): JSX.Element => {
  const loanTabs = useLoanTabs();
  const styles = useStyles();
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
      <Tabs
        value={currentTabIndex}
        onChange={(e, value) => handleChangeTabIndex(value)}
        aria-label='loans request tabs'
        variant="scrollable"
        scrollButtons="auto"
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
                  color="primary"
                />
              </Box>
            }
            id={`${LOAN_TAB_PANEL_NAME}-${index}`}
            aria-controls={`${LOAN_TAB_PANEL_NAME}-${index}`}
          />
        ))}
      </Tabs>
      <Hidden smDown>
        <Card className={styles.loansListHeader} elevation={0}>
          <Grid container>
            <Grid item xs={2}>
              Loan ID
            </Grid>
            <Grid item xs={2}>
              <Box textAlign='right'>Requested</Box>
            </Grid>
            <Grid item xs={2}>
              <Box textAlign='right'>Duration</Box>
            </Grid>
            <Grid item xs={3}>
              <Box textAlign='right'>Amount</Box>
            </Grid>
            <Grid item xs={3}>
              <Box textAlign='right'>Status</Box>
            </Grid>
          </Grid>
        </Card>
      </Hidden>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={currentTabIndex}
        onChangeIndex={handleChangeTabIndex}
      >
        {loanTabs.map((tab, index) => (
          <TabPanel
            key={tab.status}
            name={LOAN_TAB_PANEL_NAME}
            value={currentTabIndex}
            index={index}
            dir={theme.direction}
          >
            {tab.loanRequests.map((loanRequest) => (
              <LoanRow
                key={loanRequest.id}
                isMobile={isMobile}
                loanRequest={loanRequest}
              />
            ))}
          </TabPanel>
        ))}
      </SwipeableViews>
    </>
  );
};

export default LoansList;
