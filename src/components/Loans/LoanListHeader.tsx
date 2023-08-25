import React from 'react';
import { Box, Card, Grid, Hidden } from '@mui/material';
import useStyles from './LoansListStyles';

export const LoanListHeader = (): JSX.Element => {
  const styles = useStyles();
  return (
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
  );
};
