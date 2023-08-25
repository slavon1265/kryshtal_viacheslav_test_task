import React from 'react';
import { Box, Card, Grid, Hidden, Typography } from '@mui/material';
import theme from '../../theme/theme';
import useStyles from './LoansListStyles';
import { LoanRequest } from '../../types';
import classNames from 'classnames';
import { DateTime } from 'luxon';

type LoanRowProps = {
  isMobile: boolean;
  loanRequest: LoanRequest;
};

export const LoanRow = ({
  isMobile,
  loanRequest,
  ...leftProps
}: LoanRowProps): JSX.Element => {
  const styles = useStyles();

  const createdAt = DateTime.fromISO(loanRequest.createdAt).toFormat(
    'dd MMM yyyy',
  );

  return (
    <Card className={styles.loanCard} key={loanRequest.id} {...leftProps}>
      <Grid container alignItems={isMobile ? 'flex-start' : 'center'}>
        <Grid item xs={7} sm={2}>
          <span className={styles.name}>
            <Hidden smDown>FL </Hidden>
            {loanRequest.externalId}
          </span>
          <Hidden smUp>
            <Box
              component='span'
              ml={2}
              mb={-0.5}
              className={classNames(
                styles.status,
                styles.statusColor,
                loanRequest.status.replaceAll(/\s+/g, '-'),
              )}
            >
              {loanRequest.status}
            </Box>
          </Hidden>
          <div className={`${styles.subtitle} ${styles.nameSubtitle}`}>
            {loanRequest.account?.company.name}
          </div>
          <Hidden smUp>
            <Box
              className={styles.date}
              pt={1}
              color={theme.palette.text.secondary}
            >
              {createdAt}
            </Box>
          </Hidden>
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} sm={2}>
            <div className={styles.date}>{createdAt}</div>
          </Grid>
          <Grid item xs sm={2}>
            <div
              className={styles.date}
            >{`${loanRequest.duration} months`}</div>
          </Grid>
        </Hidden>
        <Grid item xs={5} sm={3}>
          <Box className={styles.amountBox}>
            <Typography
              component='div'
              variant='caption'
              className={styles.amount}
              align='right'
            >
              {`${loanRequest.amount.toLocaleString('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              &nbsp;€
            </Typography>
            <Hidden smUp>
              <Box
                mt={2}
                mb={1}
                className={styles.date}
                color={theme.palette.text.secondary}
                textAlign='right'
              >
                for {`${loanRequest.duration} months`}
              </Box>
            </Hidden>
            <Box className={styles.subtitle} textAlign='right'>
              {`${loanRequest.monthlyPayment.toLocaleString('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}€ / month`}
            </Box>
          </Box>
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} sm={3}>
            <Box textAlign='right'>
              <span
                className={classNames(
                  styles.status,
                  styles.statusColor,
                  loanRequest.status.replaceAll(/\s+/g, '-'),
                )}
              >
                {loanRequest.status}
              </span>
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Card>
  );
};
