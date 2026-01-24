/**
 * Configuration centralisée des routes API
 * 
 * @module routes/index
 */

const authRoutes = require('./auth');
const todosRoutes = require('./todos');
const tagsRoutes = require('./tags');
const jobsRoutes = require('./jobs');
const eLearningRoutes = require('./eLearning');

/**
 * Configuration des routes API
 * @param {Express} app - Instance Express
 */
function setupRoutes(app) {
  // Routes API avec préfixe /api
  app.use('/api/auth', authRoutes);
  
  // Routes sans préfixe /api (compatibilité avec l'existant)
  app.use('/todos', todosRoutes);
  app.use('/tags', tagsRoutes);
  app.use('/jobs', jobsRoutes);
  app.use('/eLearning', eLearningRoutes);
}

module.exports = {
  setupRoutes,
};

