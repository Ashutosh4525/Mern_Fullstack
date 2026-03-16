import rateLimit from 'express-rate-limit';

// Create a rate limiter (e.g., 100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});




// Optional: For stricter limits on specific routes (e.g., login)
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour
  message: 'Too many login attempts, try again later.',
});
// Then apply to a specific route, e.g., in your user router: app.post('/login', authLimiter, ...);

export {limiter,authLimiter}