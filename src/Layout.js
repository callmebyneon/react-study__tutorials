import * as React from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Container, 
  Divider, 
  Tabs, 
  Tab, 
  Tooltip, 
  Typography, 
  Paper 
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { green, purple } from '@mui/material/colors';

import Game from './Game';
import { Vis } from './vis';
import { LineChart, BarChart } from './c3';


const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1F2891',
    },
    secondary: {
      main: '#FB5A2E',
      dark: '#D73B21'
    },
    error: {
      main: '#F24C3D'
    },
    warning: {
      main: '#F2BE22'
    },
    success: {
      main: '#26A699'
    },
    info: {
      main: '#64748B'
    }
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Layout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const chartData = {
    line: {
      data1: [30, 20, 50, 40, 60, 50],
      data2: [200, 130, 90, 240, 130, 220],
      data3: [300, 200, 160, 400, 250, 250]
    },
    bar: {
      data1: [30, 200, 100, 400, 150, 250],
      data2: [130, 100, 140, 200, 150, 50]
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tooltip title="Tic-Tc-Toe Game" placement="bottom">
              <Tab label="Game" {...a11yProps(0)} />
            </Tooltip>
            <Tooltip title="Vis Chart" placement="bottom">
              <Tab label="Vis" {...a11yProps(1)} />
            </Tooltip>
            <Tooltip title="C3 Chart" placement="bottom">
              <Tab label="C3" {...a11yProps(2)} />
            </Tooltip>
          </Tabs>
        </Box>
      </Container>
      <Divider />
      <Container fixed>
        <Box sx={{ width: '100%' }}>
          <TabPanel value={value} index={0}>
            <Game />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Paper className="vis" elevation={3}>
                <Vis />
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Paper className="c3Chrart" elevation={3} sx={{ overflow: 'auto' }}>
              <LineChart data={chartData.line} />
            </Paper>
            <Paper className="c3Chrart" elevation={3} sx={{ overflow: 'auto', marginTop: 2 }}>
              <BarChart data={chartData.bar} />
            </Paper>
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
