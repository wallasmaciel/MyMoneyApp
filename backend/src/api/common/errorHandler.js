const _ = require('lodash'); 

module.exports = 
    // Padrão de export de um middleware 
    (request, response, next) => {
        const bundle = response.locals.bundle;
        // 
        if(bundle.errors) {
            // Array com todos os objetos de erros capturados 
            const errors = parseErrors(bundle.errors);
            response.status(500).json({
                errors
            });
        }else {
            next(); // Obrigado ser definido por ser um middleware
        }
    };

// Converter as mensagens de error em uma coleção de mensagens 
const parseErrors = nodeRestfulErrors => {
    const errors = [];
    // Percorrer todos os errors e definir os erros em um array
    _.forIn(nodeRestfulErrors, error => errors.push(error.message));
    // 
    return errors; 
};