import { devLogger } from '../config/logs/logger.config.js';
import { GenericDAO } from "../services/db/dao/genericDAO.js";

export async function testQuery(req, res) {
  try {
    console.log("hi");
    const result = await GenericDAO.query(`
      SELECT t.*, p.* 
      FROM dbo.tramite_testing t 
      JOIN dbo.propietario_testing p ON t.id_propietario = p.id_propietario 
      WHERE t.nro_tramite_final = '000900007009643'`
    );
    return res.sendSuccess(result);
  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}