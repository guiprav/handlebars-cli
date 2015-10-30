#!/usr/bin/env node

'use strict';

let path = require('path');
let resolve_path = path.resolve;
let basename = path.basename;

let fs = require('fs');

let hbs = require('handlebars');

let template_path = process.argv[2];
let data_path = process.argv[3];

let helper_paths = process.argv.slice(4);

helper_paths.forEach(function(helper_path) {
    let name = basename(helper_path, '.js');
    let helper = require(resolve_path(helper_path));

    hbs.registerHelper(name, helper);
});

let template = fs.readFileSync(template_path, { encoding: 'utf8' });
let data = require(resolve_path(data_path));

console.log(hbs.compile(template)(data));
