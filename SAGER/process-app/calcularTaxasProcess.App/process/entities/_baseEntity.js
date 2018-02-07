module.exports = class BaseEntity {

    constructor(typeentity) {
        this._metadata = { 
            type: typeentity ? typeentity : this.constructor.name,  
            changeTrack: "create",
            branch: "master"
        };
    }
}