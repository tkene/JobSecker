/**
 * Configuration CORS pour Express
 * 
 * @module config/cors
 */

/**
 * Configuration CORS selon l'environnement
 * @returns {Object} Options CORS
 */
function getCorsOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Liste des origines autorisées
  const allowedOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
    : (isProduction 
      ? [] 
      : [
          'http://localhost:5173',
          'http://localhost:3000',
          'http://127.0.0.1:5173',
          'http://127.0.0.1:3000'
        ]);

  // Fonction pour vérifier l'origine dynamiquement
  const originFunction = (origin, callback) => {
    // Autoriser les requêtes sans origine (ex: Postman, curl)
    if (!origin) {
      return callback(null, true);
    }
    
    // Vérifier si l'origine est dans la liste autorisée
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  };

  return {
    origin: originFunction,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400, // 24 heures
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
}

module.exports = {
  getCorsOptions,
};

