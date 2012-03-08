function LocaloPackage(data) {
    // default the data if undefined
    data = data || {};
    
    // initialise members
    this.name = data.name || 'Untitled Package';
    this.version = data.version || '';
    
    // generate the id
    this.id = _makeId(this.name, this.version);
    
    // make a reference to the resources
    this.repository = (data.repository || 'local').replace(/\/$/, '');
}

LocaloPackage.prototype.load = function(store, callback) {
    // get the current version of the package in the store
    store.get()
};

LocaloPackage.prototype.update = function(store, content) {
    // TODO: iterate through the content items and push to the store
};