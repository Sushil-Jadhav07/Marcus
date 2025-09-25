// Utility functions to build TradingView-compatible NSE symbols and URLs

/**
 * Normalize a raw NSE symbol/ticker to TradingView NSE format.
 * Examples:
 *  - "RELIANCE-EQ" -> "RELIANCE"
 *  - "tcs" -> "TCS"
 *  - "HDFCBANK.NS" -> "HDFCBANK"
 *  - "NSE_TATAMOTORS" -> "TATAMOTORS"
 *  - handles common contract suffixes like FUT/OPT and expiry suffixes
 */
export function normalizeNseSymbolForTradingView(rawSymbol) {
  if (!rawSymbol) return '';
  let v = String(rawSymbol).toUpperCase().trim();

  // Remove .NS suffix if present
  v = v.replace(/\.NS$/i, '');

  // Remove common NSE suffixes
  v = v.replace(/-(EQ|BE|BL|SM|BZ)$/i, '');

  // Remove leading NSE_ or NSE
  v = v.replace(/^NSE_?/i, '');

  // Strip expiry / contract suffixes (very generic handling)
  v = v.replace(/\d{2}(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\d{2}(?:FUT|OPT)?$/i, '');
  v = v.replace(/\d{2}(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV)(?:FUT|OPT)?$/i, '');
  v = v.replace(/(FUT|OPT)$/i, '');

  // Remove spaces
  v = v.replace(/\s+/g, '');

  return v;
}

/**
 * Build a TradingView chart URL for an NSE instrument.
 * Accepts a raw item or a string; attempts to pick the symbol field.
 */
export function buildTradingViewNseUrl(itemOrSymbol) {
  const raw = typeof itemOrSymbol === 'string'
    ? itemOrSymbol
    : (itemOrSymbol?.symbol || itemOrSymbol?.SYMBOL || itemOrSymbol?.tradingsymbol || itemOrSymbol?.tradingSymbol || itemOrSymbol?.ticker || '');

  const normalized = normalizeNseSymbolForTradingView(raw);
  if (!normalized) return null;
  return `https://www.tradingview.com/chart/?symbol=NSE:${encodeURIComponent(normalized)}`;
}


