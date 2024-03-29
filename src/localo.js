var localo = (function() {
    
    //= github://isaacs/node-semver/semver
    
    //= core/package
    //= core/loader
    
    //= storage/local
    
    var packages = [], 
        store,
        loader = new Loader(),
        storeTypes = {
            'local': LocalStorageStore
        };
    
    function _clean(callback) {
        store.clean(callback);
    }
    
    function _define(title, version, content) {
        // find the package
        var pkg = _findPackage(_makeId(title, version));
        
        // if the package is active, then update the content
        if (pkg) {
            pkg.update(store, content);
        }
    }
    
    function _findPackage(id) {
        // iterate through the packages and find the requested package
        for (var ii = packages.length; ii--; ) {
            if (packages[ii].id === id) {
                return packages[ii];
            }
        }
        
        return undefined;
    }
    
    function _init(packageData) {
        // create a package object from the data
        return packages[packages.length] = new LocaloPackage(packageData);
    } // _init
    
    function _localo(opts, callback) {
        var StoreType;
        
        function run() {
            // load the packages from the store
            loader.refresh(packages, store, function() {
                loader.loadInto(store, document.body, callback);
            });
        }
        
        // if opts is a function, then it's the callback
        if (typeof opts == 'function') {
            callback = opts;
            opts = {};
        }
        
        // ensure we have options
        opts = opts || {};
        opts.store = opts.store || 'local';
        
        // get the store type
        StoreType = storeTypes[opts.store];
        
        // create the store
        if (! StoreType) {
            throw new Error('Unable to create storage engine of type: ' + opts.store);
        }
        
        // create the store
        store = new StoreType();
        
        // if the refresh option has been set, then clean the store before load
        if (opts.refresh) {
            store.clean(run);
        }
        else {
            run();
        }
    } // _lolo
    
    // attach the additional helpers to localo
    _localo.clean = _clean;
    _localo.define = _define;
    _localo.init = _init;
    
    return _localo;
})();