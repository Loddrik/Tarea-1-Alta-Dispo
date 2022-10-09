import { Router } from 'express';
import controller from '../controllers/resennas';

const router = Router();

router.post('/resenna/:id',   controller.createResenna);
router.get('/resenna/:id',    controller.readResenna);
router.delete('/resenna/:id', controller.deleteResenna);

/** Users */

export = router;
