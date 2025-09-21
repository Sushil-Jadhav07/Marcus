import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { PageLoader } from '../common/Loader';
import useUpstoxLiveCandles from '../../hooks/useUpstoxLiveCandles';

const NSELiveIntraday = ({
  instrumentKey = 'NSE_INDEX|NIFTY_50',
  interval = '1minute',
  height = 500,
}) => {
  const wsUrl = process.env.REACT_APP_UPSTOX_WS_URL;
  const accessToken = process.env.REACT_APP_UPSTOX_ACCESS_TOKEN;

  const { candles, volumes, connected, error } = useUpstoxLiveCandles({
    wsUrl,
    accessToken,
    instrumentKey,
    interval,
    bootstrapHistory: true,
  });

  const tokenInfo = useMemo(() => {
    try {
      const parts = (accessToken || '').split('.');
      if (parts.length < 2) return null;
      const json = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      const exp = json.exp ? new Date(json.exp * 1000) : null;
      return { exp, raw: json };
    } catch {
      return null;
    }
  }, [accessToken]);

  const candleOptions = useMemo(() => ({
    chart: {
      id: 'nse-live-candles',
      type: 'candlestick',
      toolbar: { show: true },
      animations: { enabled: true },
      foreColor: '#D1D5DB',
    },
    theme: { mode: 'dark' },
    plotOptions: { candlestick: { wick: { useFillColor: true } } },
    xaxis: {
      type: 'datetime',
      crosshairs: {
        show: true,
        stroke: { color: 'rgba(255,255,255,0.5)', width: 1, dashArray: 4 },
        fill: { type: 'solid', color: 'transparent' },
      },
    },
    yaxis: { tooltip: { enabled: true } },
    grid: { borderColor: 'rgba(255,255,255,0.08)' },
    tooltip: { shared: true },
  }), []);

  const volumeOptions = useMemo(() => ({
    chart: {
      id: 'nse-live-volume',
      type: 'bar',
      animations: { enabled: true },
      foreColor: '#D1D5DB',
    },
    theme: { mode: 'dark' },
    plotOptions: {
      bar: {
        columnWidth: '75%',
        colors: {
          ranges: [
            { from: -1, to: 0, color: '#ef4444' },
            { from: 0, to: Number.MAX_SAFE_INTEGER, color: '#22c55e' },
          ],
        },
      },
    },
    grid: { borderColor: 'rgba(255,255,255,0.08)' },
    dataLabels: { enabled: false },
    xaxis: { type: 'datetime' },
    yaxis: { labels: { show: true, formatter: (v) => Math.abs(v) } },
  }), []);

  if (!wsUrl || !accessToken) {
    return (
      <div className="h-full flex items-center justify-center text-white/80 text-sm">
        Upstox credentials not set. Please provide REACT_APP_UPSTOX_WS_URL and REACT_APP_UPSTOX_ACCESS_TOKEN.
      </div>
    );
  }

  if (!candles.length && !error) {
    return (
      <div className="h-full flex items-center justify-center">
        <PageLoader text="Connecting to live market data..." />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-white/90 font-semibold">NIFTY 50 – {interval} LIVE</h3>
          <span className={`text-[10px] rounded-sm px-2 py-0.5 ${connected ? 'bg-white text-red-800' : 'bg-gray-600 text-white'}`}>
            {connected ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
        <span className="text-xs text-white/50">Source: Upstox Market Feed</span>
      </div>
      {error ? (
        <div className="text-red-400 text-xs mb-2">
          {error}
          {tokenInfo?.exp ? (
            <>
              {' '}• Token exp: {tokenInfo.exp.toLocaleString()}
            </>
          ) : null}
        </div>
      ) : null}
      <div className="rounded-xl overflow-hidden bg-black/30">
        <ReactApexChart options={candleOptions} series={[{ data: candles }]} type="candlestick" height={height - 120} />
        <ReactApexChart
          options={volumeOptions}
          series={[{
            name: 'Volume',
            data: volumes.map((d, i) => {
              const prev = candles[i] || candles[i - 1];
              const open = prev?.y?.[0] ?? 0;
              const close = prev?.y?.[3] ?? 0;
              const y = (close >= open) ? d.y : -d.y;
              return { x: d.x, y };
            })
          }]}
          type="bar"
          height={100}
        />
      </div>
    </div>
  );
};

export default NSELiveIntraday;
