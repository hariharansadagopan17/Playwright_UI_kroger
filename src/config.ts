export const testConfig = {
  baseURL: 'https://krogs-auth.sce.manh.com/auth/realms/maactive/protocol/openid-connect/auth?scope=openid&client_id=zuulserver.1.0.0&redirect_uri=https://krogs.sce.manh.com/login&response_type=code&state=AMn3rG',
  landingURL: 'https://krogs.sce.manh.com/udc/landing',

  // App credentials
  credentials: {
    username: 'czt8626',
    password: 'Monthjan@123',
  },
  directCredentials: {
    username: 'hardik.sharma@kroger.com',
    password: 'Element92u17$',
  },

  // ✅ Proxy config — suppresses the browser popup automatically
  proxy: {
    server: 'http://cdcproxy.kroger.com:3128',
    username: 'CZT6189',
    password: '/*ilmCtii17$*/', 
  },

  timeout: 30000,
  navigationTimeout: 30000,
};