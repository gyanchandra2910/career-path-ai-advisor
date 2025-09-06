// Middleware for request logging and validation

const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

const validateApiKey = (req, res, next) => {
  // Skip API key validation in development
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      error: 'Invalid or missing API key'
    });
  }
  
  next();
};

const rateLimiter = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const clientId = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requests.has(clientId)) {
      requests.set(clientId, []);
    }
    
    const clientRequests = requests.get(clientId);
    const recentRequests = clientRequests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests, please try again later'
      });
    }
    
    recentRequests.push(now);
    requests.set(clientId, recentRequests);
    
    next();
  };
};

module.exports = {
  requestLogger,
  validateApiKey,
  rateLimiter
};
