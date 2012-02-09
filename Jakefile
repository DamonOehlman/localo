var interleave = require('interleave'),
    aliases = {
        'eve': 'github://DmitryBaranovskiy/eve/eve.js',
        'interact': 'github://DamonOehlman/interact/interact.js',
        'classtweak': 'github://DamonOehlman/classtweak/classtweak.js',
        'when': 'github://briancavalier/when.js/when.js'
    };
    
task('default', function() {
    // build the core files
    interleave('src', {
        path: '.',
        after: ['uglify']
    });
});