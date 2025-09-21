import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { PageLoader } from '../common/Loader';

const ALPHA_VANTAGE_API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_KEY || 'KQ8PRBWUMST0YJ96';
const SYMBOL = 'NIFTYBEES.BSE'; // Tracks NIFTY 50

const Nifty50Chart = ({ height = 360 }) => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let canceled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(
          SYMBOL
        )}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        const { data } = await axios.get(url);

        const ts = data?.['Time Series (Daily)'];
        if (!ts) {
          throw new Error(
            data?.Note || data?.Information || 'No time series returned from API'
          );
        }

        // Convert to arrays and sort by date ascending
        const points = Object.entries(ts)
          .map(([date, values]) => ({
            date,
            close: Number(values['4. close'])
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(-180); // last ~6 months

        if (canceled) return;

        setCategories(points.map((p) => p.date));
        setSeries([
          {
            name: 'NIFTY 50 (via NIFTYBEES)',
            data: points.map((p) => p.close)
          }
        ]);
      } catch (e) {
        if (!canceled) setError(e?.message || 'Failed to load data');
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      canceled = true;
    };
  }, []);

  const options = useMemo(
    () => ({
      chart: {
        type: 'area',
        toolbar: { show: true },
        zoom: { enabled: true },
        animations: { enabled: true }
      },
      stroke: { curve: 'smooth', width: 2 },
      dataLabels: { enabled: false },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.35,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        }
      },
      colors: ['#00E396'],
      xaxis: {
        type: 'datetime',
        categories,
        labels: { show: true }
      },
      yaxis: {
        labels: {
          formatter: (v) => v.toFixed(2)
        }
      },
      tooltip: {
        x: { format: 'yyyy-MM-dd' },
        y: {
          formatter: (v) => `₹${Number(v).toFixed(2)}`
        }
      },
      grid: { strokeDashArray: 4 }
    }), [categories]
  );

  if (loading) {
    return (
      <div className="bg-white/60 dark:bg-black/30 rounded-xl p-6">
        <PageLoader text="Loading NIFTY 50 chart..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl p-4">
        Failed to load chart: {error}
      </div>
    );
  }

  return (
    <div className="bg-white/60 dark:bg-black/30 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-900 dark:text-gray-100 font-semibold">
          NIFTY 50 – Daily (via NIFTYBEES)
        </h3>
        <span className="text-xs text-gray-500">Source: Alpha Vantage</span>
      </div>
      <ReactApexChart options={options} series={series} type="area" height={height} />
    </div>
  );
};

export default Nifty50Chart;
