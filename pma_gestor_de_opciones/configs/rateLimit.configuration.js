import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req, res) => {
        console.log(`Peticiones excedidas desde IP: ${req.ip}, Endpoint: ${req.path}`);
        res.status(429).json({
            success: false,
            message: "demasiadas peticiones desde esta IP, intenta de nuecvo mas tarde",
            error: 'RATE_LIMIT_EXCEEDED',
            retryAfter: Math.round((req.rateLimit.resetTime - Date.now()/1000))
        })
    }
});