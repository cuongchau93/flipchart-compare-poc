"use strict";

let cheerio = require('cheerio');
let rp = require('request-promise');

exports.prepareToServe = function(req, res, next) {     // dummy service
    res.json({});
};

exports.compare = function(req, res, next) {
    let url1 = req.body.url1;
    let url2 = req.body.url2;

    let requests = [rp(url1), rp(url2)];            /// retrieve link content


    Promise.all(requests).then( data => {
        /// transform to json format for UI handle
        let dom1 = cheerio.load(data[0]);
        let dom2 = cheerio.load(data[1]);

        let feature = {};

        let keys1 = [];
        let keys2 = [];
        let values1 = [];
        let values2 = [];
        dom1('ul.specification-keys li.key-li span.key-title').each(function(i, elem) {
            keys1[i] = elem.children[0].data;
        });
        dom1('ul.specification-keys li.key-li div.key-value').each(function(i, elem) {
            values1[i] = elem.children[0].data;
        });
        dom2('ul.specification-keys li.key-li span.key-title').each(function(i, elem) {
            keys2[i] = elem.children[0].data;
        });
        dom2('ul.specification-keys li.key-li div.key-value').each(function(i, elem) {
            values2[i] = elem.children[0].data;
        });
        let spec = {};
        for(let i = 0; i < keys1.length; ++i){
            spec[keys1[i]] = [values1[i]];
        }

        for(let i = 0; i < keys2.length; ++i){
            if(Array.isArray(spec[keys2[i]])){
                spec[keys2[i]].push(values2[i]);
            }else{
                spec[keys2[i]] = ["", values2[i]];
            }
        }
        feature["Specification"] = spec;


        // dom1('#module_product_price_1 .pdp-price_type_normal').text()
        // dom1('#module_product_price_1 .pdp-price_type_deleted').text()
        // dom1('#module_product_price_1 .pdp-product-price__discount').text()


        res.json(feature);

    }).catch(error =>{
        res.status(400).json("Error while retrieving the pages:" + error);
    });

    // request(url1, function (error, response, body) {
    //     if (!error) {
    //         let $ = cheerio.load(body);
    //
    //         let feature = {};
    //
    //         let keys = [];
    //         let values = [];
    //         $('ul.specification-keys li.key-li span.key-title').each(function(i, elem) {
    //             keys[i] = elem.children[0].data;
    //         });
    //         $('ul.specification-keys li.key-li div.key-value').each(function(i, elem) {
    //             values[i] = elem.children[0].data;
    //         });
    //
    //
    //         for(let i = 0; i < keys.length; ++i){
    //             feature["featureName"] = keys[i];
    //             feature["values"] = [values[i], values[j]]
    //         }
    //
    //
    //         console.log('URL: ' + url);
    //         console.log('Title: ' + title);
    //     }
    //     else {
    //         console.log("We’ve encountered an error: " + error);
    //     }
    // });
    //
    // request(url1, function (error, response, body) {
    //     if (!error) {
    //         let $ = cheerio.load(body);
    //
    //         let feature = {};
    //
    //         let keys = [];
    //         let values = [];
    //         $('ul.specification-keys li.key-li span.key-title').each(function(i, elem) {
    //             keys[i] = elem.children[0].data;
    //         });
    //         $('ul.specification-keys li.key-li div.key-value').each(function(i, elem) {
    //             values[i] = elem.children[0].data;
    //         });
    //
    //
    //         for(let i = 0; i < keys.length; ++i){
    //             feature["featureName"] = keys[i];
    //             feature["values"] = [values[i], values[j]]
    //         }
    //
    //
    //         console.log('URL: ' + url);
    //         console.log('Title: ' + title);
    //     }
    //     else {
    //         console.log("We’ve encountered an error: " + error);
    //     }
    // });

    /// build response

    /// return

};