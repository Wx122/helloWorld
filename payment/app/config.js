'use strict';
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../configs/config.service.json'), 'utf-8'));

module.exports = config;
