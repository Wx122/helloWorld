const SwaggerClient = require('swagger-client');
const jsYaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const config = require('../app/config');
const serviceConfig = config.swagger.svcAliPay;

module.exports = {
    initIDL: async () => {
        const geniusIDL = jsYaml.safeLoad(
            fs.readFileSync(
                path.join(
                    __dirname,
                    `../../../lbConf/swagger_files/${serviceConfig.swaggerFile}`
                ),
                'utf8'
            )
        );
        const client = await new SwaggerClient({
            spec: Object.assign({}, geniusIDL, {
                host: `${serviceConfig.host}:${serviceConfig.port}`
            })
        });

        module.exports.api = client.apis;
    },
};