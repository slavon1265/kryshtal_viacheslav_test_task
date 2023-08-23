import { Box } from '@mui/material';
import React from 'react';

type TabPanelProps = {
  dir?: string;
  name: string
  index: number;
  value: number;
};

export function TabPanel({ children, name, value, index, ...other }: React.PropsWithChildren<TabPanelProps>): JSX.Element {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${name}-${index}`}
      aria-labelledby={`${name}-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}