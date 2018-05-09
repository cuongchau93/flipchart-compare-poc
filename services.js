"use strict";

let cheerio = require('cheerio');
let rp = require('request-promise');
let mapping = require('./modelMapping.json');

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
        dom1(mapping.specTitle).each(function(i, elem) {
            keys1[i] = elem.children[0].data;
        });
        dom1(mapping.specValue).each(function(i, elem) {
            values1[i] = elem.children[0].data;
        });
        dom2(mapping.specTitle).each(function(i, elem) {
            keys2[i] = elem.children[0].data;
        });
        dom2(mapping.specValue).each(function(i, elem) {
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
        feature["Specifications"] = spec;

        spec = {};
        let img1 = dom1(mapping.productImage).attr();
        let img2 = dom2(mapping.productImage).attr();
        spec["Product Name"] = [img1.alt, img2.alt];
        spec["Product Thumbnail"] = [img1.src, img2.src];

        let averageScore1 = dom1(mapping.rating.avgScore).text();
        let numRatings1 = dom1(mapping.rating.numReviews).text();
        let averageScore2 = dom2(mapping.rating.avgScore).text();
        let numRatings2 = dom2(mapping.rating.numReviews).text();
        spec["Scores"] = [averageScore1, averageScore2];
        spec["Reviews"] = [numRatings1, numRatings2];

        let currentPrice1 = dom1(mapping.price.current).text();
        let deletedPrice1 = dom1(mapping.price.deleted).text();
        let percentDiscount1 = dom1(mapping.price.discount).text();
        let currentPrice2 = dom2(mapping.price.current).text();
        let deletedPrice2 = dom2(mapping.price.deleted).text();
        let percentDiscount2 = dom2(mapping.price.discount).text();
        spec["Original Price"] = [deletedPrice1, deletedPrice2];
        spec["Discount Percent"] = [percentDiscount1, percentDiscount2];
        spec["Current Price"] = [currentPrice1, currentPrice2];

        feature["Highlights"] = spec;

        res.json(feature);

    }).catch(error =>{
        res.status(400).json(error);
    });
};