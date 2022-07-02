const BillingCycle = require('./billingCycle');
const errorHandler = require('./../common/errorHandler');

BillingCycle.methods([
    'get', 
    'post', 
    'put', 
    'delete'
]);

BillingCycle.updateOptions({
    new: true, // Sempre resultar a partir de um 'update' o registro atualizado 
    runValidators: true // Utilizar as validações quando for usado um 'put' pois por padrão só é usado ao post
});

// Adicionar um middleware ao 'restful'
BillingCycle
    .after('post', errorHandler)
    .after('put', errorHandler);

// Registro de rota de quantidade de registros existentes na tabela 
// Não precisa informa a barra '/'
BillingCycle.route('count', (request, response, next) => {
    BillingCycle.count((error, value) => {
        // 
        if(error) 
            response.status(500)
                .json({ erros: [ error ] });
        else 
            response.status(200)
                .json({ value });
    });
});

// Console de dados de tudo que já foi cadastrado 
BillingCycle.route('summary', (request, response, next) => {
    BillingCycle.aggregate([
        {
            // projetando a agregação 
            $project: { 
                credit: {
                    $sum: "$credits.value" // credit = soma de todos os creditos 
                }, 
                debt: {
                    $sum: "$debts.value" // debt = soma de todos os debitos
                }
            }
        }, {
            // Agregar todos os registros de uma coleção 
            // Agrupar registros 
            $group: {
                _id: null, // Nenhum criterio de agrupamento 
                credit: {
                    $sum: "$credit"
                },
                debt: {
                    $sum: "$debt"
                }
            } 
        }, {
            // Extraindo o '_id' para aparecer apenas credito e debito 
            $project: {
                _id: 0, 
                credit: 1, 
                debt: 1
            }
        }
    ], (error, result) => {
        if(error)
            response.status(500).json({
                errors: [
                    error
                ]
            });
        else
            response.status(200).json(
                result[0] || { credit: 0, debt: 0 }
            );
    });
});

module.exports = BillingCycle; 