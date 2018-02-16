/**
 * @class BaseEntity
 * @description classe base para definição de entidades de negócio.
 */
module.exports = class BaseEntity {

    constructor(typeentity) {
        this._metadata = { 
            type: typeentity ? typeentity : this.constructor.name.toLowerCase(),  
            changeTrack: "create",
            branch: "master"
        };
    }
}