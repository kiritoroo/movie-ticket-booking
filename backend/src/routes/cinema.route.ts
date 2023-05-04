import { Router, Request, Response } from 'express';
import {

} from '@controller/cinema.controller';

import {

} from '@schema/cinema.schema';

const cinemaRouter = Router();

  /**
   * @openapi
   * tags:
   *   name: Cinemas
   *   description: Cinema management
   *
   */


  /**
   * @openapi
   * '/api/cinemas':
   */
cinemaRouter.route('/cinemas').get(

)

  /**
   * @openapi
   * '/api/cinemas/{cinemaId}':
   */
cinemaRouter.route('/cinemas/:cinemaId').get(

)


  /**
   * @openapi
   * '/api/cinemas':
   */
cinemaRouter.route('/cinemas').post(

)


  /**
   * @openapi
   * '/api/cinemas/{cinemaId}':
   */
cinemaRouter.route('/cinemas/:cinemaId').put(

)


  /**
   * @openapi
   * '/api/cinemas/{cinemaId}':
   */
cinemaRouter.route('/cinemas/:cinemaId').delete(

)

export default cinemaRouter;