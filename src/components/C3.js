import C3Chart from 'react-c3js';
import 'c3/c3.css';

export function LineChart ({ data }) {
  return (
    <C3Chart 
      data={{ json: data }} 
      size={{ width: 640, height: 480 }}
      tooltip={{
        format: {
          title: (x, index) => { return }
        }
      }}
    />
  );
}

export function BarChart ({ data }) {
  return (
    <C3Chart 
      data={{ json: data, type: 'bar' }}
      size={{ width: 640, height: 480 }}
    />
  );
}
