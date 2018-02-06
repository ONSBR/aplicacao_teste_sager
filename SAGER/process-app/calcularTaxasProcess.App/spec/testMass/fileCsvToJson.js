const csv = require('csvtojson');
const fs = require('fs');

module.exports = class FileCsvToJson {

    static convert(fileName, mapJson) {

        var retorno = [];

        const csvFilePath = "./spec/testMass/filesMass/" + fileName + ".csv";
        const csv = require("csvtojson");

        return new Promise((res, rej) => {

            csv({ delimiter: ";" }).fromFile(csvFilePath).on('json', (jsonObj) => {

                // combine csv header row and csv line to a json object
                retorno.push(mapJson(jsonObj));

            }).on('done', (error) => {
                if (error) {
                    console.error(error);
                    rej("error csvToJson: " + fileName + ", error: " + error);
                } else {
                    console.log("done csvToJson: " + fileName);
                    res(retorno);
                }
            })
        });

    }
}