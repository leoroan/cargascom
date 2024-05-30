import { sequelize } from '../../../services/models.setup.db.js';

export const GenericDAO = {
  async query(sqlQuery) {
    try {
      const [results, metadata] = await sequelize.query(sqlQuery);
      return results;
    } catch (error) {
      console.error('Error al ejecutar consulta SQL:', error);
      throw error;
    }
  }
};