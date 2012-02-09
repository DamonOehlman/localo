function LocaloPackage(data) {
    // default the data if undefined
    data = data || {};
    
    // initialise members
    this.name = data.name || 'Untitled Package';
    
    // generate the id
    this.id = this.name.replace(/\s/g, '_').toLowerCase();
    
    // make a reference to the resources
    this.repository = (data.repository || 'local').replace(/\/$/, '');
}

LocaloPackage.prototype.load = function(store, callback) {
    // get the current version of the package in the store
    store.get()
};