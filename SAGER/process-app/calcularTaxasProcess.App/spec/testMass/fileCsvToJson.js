const csv = require('csvtojson');
const fs = require('fs');

var PATH_FILES_MASS = "./spec/testMass/filesMass/";

module.exports = class FileCsvToJson {

    static set pathFileMass(pathFilesMass) {
        PATH_FILES_MASS = pathFilesMass;
    }

    static convert(fileName, mapJson) {

        var retorno = [];

        const csvFilePath = PATH_FILES_MASS + fileName + ".csv";
        console.log(csvFilePath);
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