function _makeId(name, version) {
    var id = name.replace(/\s/g, '-').toLowerCase();
    
    // return the id concatenated with the version if appropriate
    return id + (version ? (':' + version.replace(/\./g, '-')) : '');
}