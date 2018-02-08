const csv = require('csvtojson');
const fs = require('fs');

var PATH_FILES_MASS = "./spec/testmass/filesmass/";

module.exports = class FileCsvToJson {

    constructor(pathFilesMass) {
        if (!pathFilesMass) {
            pathFilesMass = PATH_FILES_MASS;
        }
        this.pathFilesMass = pathFilesMass;
    }

    set pathFileMass(pathFilesMass) {
        this.pathFilesMass = pathFilesMass;
    }

    convert(fileName, mapJson) {

        var retorno = [];

        const csvFilePath = this.pathFilesMass + fileName + ".csv";
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