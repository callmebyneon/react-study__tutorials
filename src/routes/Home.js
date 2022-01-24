import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { green, purple } from '@mui/material/colors';

import Game from './../components/Game';
import { Vis } from './../components/Vis';
import { LineChart, BarChart } from './../components/C3';
import { Apex } from './../components/Apex';


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

export default function Home() {
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
      <Container component="main">
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
            <Tooltip title="APEXCHARTS" placement="bottom">
              <Tab label="APEXCHARTS" {...a11yProps(3)} />
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
          <TabPanel value={value} index={3}>
            <Paper className="APEXCHARTS" elevation={3} sx={{ p: 2, overflow: 'auto' }}>
              <Apex />
            </Paper>
          </TabPanel>
        </Box>
      </Container>
      <Link to="/signin">
        <Fab 
          size="small"
          color="primary" 
          variant='extended' 
          aria-label="Sign in" 
          sx={{ 
            position: 'absolute',
            top: 7,
            right: 24,
            fontSize: 12,
            p: 2
          }}
        >
          <LockOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
          Sign In
        </Fab>
      </Link>
    </ThemeProvider>
  );
}
