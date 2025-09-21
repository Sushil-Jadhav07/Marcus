import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Simple WebSocket hook to connect to Grow API and stream symbols for a sector.
 * The endpoint and subscription message are configurable via params so we can
 * adapt once the exact API contract is known.
 */
export function useGrowWebSocket({
  wsUrl,
  accessToken,
  sector,
  nseOnly = true,
  buildSubscribePayload,
  parseMessage,
}) {
  const [connected, setConnected] = useState(false);
  const [rows, setRows] = useState([]);
  const socketRef = useRef(null);

  const canConnect = useMemo(() => Boolean(wsUrl && accessToken && sector), [wsUrl, accessToken, sector]);

  useEffect(() => {
    if (!canConnect) return;

    const url = new URL(wsUrl);
    url.searchParams.set('token', accessToken);
    socketRef.current = new WebSocket(url.toString());

    const ws = socketRef.current;
    let alive = true;

    ws.addEventListener('open', () => {
      setConnected(true);
      try {
        const subPayload = buildSubscribePayload ? buildSubscribePayload({ sector, nseOnly }) : null;
        if (subPayload) ws.send(JSON.stringify(subPayload));
      } catch {}
    });

    ws.addEventListener('message', (evt) => {
      try {
        const data = JSON.parse(evt.data);
        const items = parseMessage ? parseMessage(data) : [];
        if (!alive) return;
        setRows((prev) => {
          // Replace with latest payload; tweak if API is diff
          return Array.isArray(items) ? items : prev;
        });
      } catch {
        // ignore malformed frame
      }
    });

    ws.addEventListener('close', () => {
      setConnected(false);
    });

    return () => {
      alive = false;
      try { ws.close(); } catch {}
    };
  }, [canConnect, wsUrl, accessToken, sector, nseOnly, buildSubscribePayload, parseMessage]);

  return { connected, rows };
}

export default useGrowWebSocket;


