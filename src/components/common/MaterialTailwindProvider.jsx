import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-tailwind/react';

const MaterialTailwindProvider = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>{children}</div>;
  }

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

export default MaterialTailwindProvider;
