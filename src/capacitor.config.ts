
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.finflow',
  appName: 'FinFlow',
  webDir: 'dist',
  server: {
    url: 'https://e8a1f39d-0a68-490c-9624-d639eb9d1a88.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
