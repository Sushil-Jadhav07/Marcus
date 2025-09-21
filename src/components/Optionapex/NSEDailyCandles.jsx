import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { PageLoader } from '../common/Loader';

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_KEY || 'KQ8PRBWUMST0YJ96';
const SYMBOL = 'NIFTYBEES.BSE'; // NIFTY 50 tracking ETF with daily data available

const NSEDailyCandles = ({ days = 180, height = 500 }) => {
  const [candleSeries, setCandleSeries] = useState([]);
  const [volumeSeries, setVolumeSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetchDaily = async () => {
      try {
        setLoading(true);
        setError('');
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${encodeURIComponent(
          SYMBOL
        )}&outputsize=compact&apikey=${API_KEY}`;
        const { data } = await axios.get(url);
        const ts = data?.['Time Series (Daily)'];
        if (!ts) throw new Error(data?.Note || data?.Information || 'No daily data');

        const rows = Object.entries(ts)
          .map(([date, ohlcv]) => ({
            x: date,
            o: Number(ohlcv['1. open']),
            h: Number(ohlcv['2. high']),
            l: Number(ohlcv['3. low']),
            c: Number(ohlcv['4. close']),
            v: Number(ohlcv['5. volume'])
          }))
          .sort((a, b) => new Date(a.x) - new Date(b.x))
          .slice(-days);

        if (cancelled) return;

        setCandleSeries([
          {
            data: rows.map((r) => ({ x: new Date(r.x), y: [r.o, r.h, r.l, r.c] }))
          }
        ]);
        setVolumeSeries([
          {
            name: 'Volume',
            data: rows.map((r) => ({ x: new Date(r.x), y: r.v, c: r.c, o: r.o }))
          }
        ]);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchDaily();
    return () => {
      cancelled = true;
    };
  }, [days]);

  const candleOptions = useMemo(
    () => ({
      chart: {
        id: 'nse-candles',
        type: 'candlestick',
        toolbar: { show: true },
        animations: { enabled: true },
        foreColor: '#D1D5DB'
      },
      theme: { mode: 'dark' },
      plotOptions: { candlestick: { wick: { useFillColor: true } } },
      xaxis: {
        type: 'datetime',
        crosshairs: {
          show: true,
          stroke: { color: 'rgba(255,255,255,0.5)', width: 1, dashArray: 4 },
          fill: { type: 'solid', color: 'transparent' }
        }
      },
      yaxis: { tooltip: { enabled: true } },
      grid: { borderColor: 'rgba(255,255,255,0.08)' },
      tooltip: { shared: true },
      colors: ['#26a69a']
    }), []
  );

  const volumeOptions = useMemo(
    () => ({
      chart: {
        id: 'nse-volume',
        type: 'bar',
        brush: { enabled: false, target: 'nse-candles' },
        selection: { enabled: false },
        animations: { enabled: true },
        foreColor: '#D1D5DB'
      },
      theme: { mode: 'dark' },
      plotOptions: {
        bar: {
          columnWidth: '75%',
          colors: {
            ranges: [
              { from: -1, to: 0, color: '#ef4444' },
              { from: 0, to: Number.MAX_SAFE_INTEGER, color: '#22c55e' }
            ]
          }
        }
      },
      grid: { borderColor: 'rgba(255,255,255,0.08)' },
      dataLabels: { enabled: false },
      xaxis: { type: 'datetime', labels: { show: true } },
      yaxis: { labels: { show: true, formatter: (v) => Math.abs(v) } },
      tooltip: {
        y: {
          formatter: (v, opts) => `${opts?.w?.globals?.seriesNames?.[opts.seriesIndex] || 'Vol'}: ${v}`
        }
      }
    }), []
  );

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <PageLoader text="Loading NIFTY daily candles..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-sm">Failed to load: {error}</div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white/90 font-semibold">NIFTY 50 – Daily Candles (via NIFTYBEES)</h3>
        <span className="text-xs text-white/50">Source: Alpha Vantage</span>
      </div>
      <div className="rounded-xl overflow-hidden bg-black/30">
        <ReactApexChart options={candleOptions} series={candleSeries} type="candlestick" height={height - 120} />
        <ReactApexChart
          options={volumeOptions}
          series={[
            {
              name: 'Volume',
              data: volumeSeries[0]?.data?.map((d, idx, arr) => ({
                x: d.x,
                // use negative value for red bars to color via range
                y: d.c >= d.o ? d.y : -d.y
              })) || []
            }
          ]}
          type="bar"
          height={100}
        />
      </div>
    </div>
  );
};

export default NSEDailyCandles;
