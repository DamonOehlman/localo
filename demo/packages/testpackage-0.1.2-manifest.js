localo.manifest('test-package', '0.1.2', {
    scripts: [
        '// script goes here, but needs to be all on a singe line\nalert(\'hello\');'
    ],
    
    css: [
    ],
    
    snippets: {
        hbstemplate: '<ul>{{#each item}}<li>{{ text }}</li>{{/each}}</ul>'
    }
});