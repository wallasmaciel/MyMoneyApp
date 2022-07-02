const express = require('express');

module.exports = server => {
    // Definir URL base para todas as rotas 
    const router = express.Router();
    server.use('/api', router);

    // Mapeamento das rotas de ciclo de pagamento 
    const BillingCycle = require('./../api/billingCycle/billingCycleService');
    BillingCycle.register(router, '/billingCycles');
};