# localo - localStorage Resource Loader and Cacher

_This is a discussion before it becomes a project._

## Overview and Reasoning

Despite some variance in opinion with regards to whether `localStorage` is fast or slow, bad or good, I believe it to be something that is worth exploring with regards to caching remote resources especially on narrower than desktop broadband connections.

Last year, at [Web Directions Unplugged](http://unplugged11.webdirections.org/program/), [Nicholas Zakas](http://twitter.com/slicknet) talked about a number of [different topics with regards to web performance](http://www.webdirections.org/resources/nicholas-zakas-mobile-web-speed-bumps/) and in that time talked about a trick that [Steve Souders](http://twitter.com/souders) covered regarding use of localStorage to cache remote resources such as Javascript and CSS.  

I've been thinking of ways to do something along these lines since this time, and specifically around ways this could be a __purely client-side solution__. (_Previous implementations require some cooperation between the server-side and client-side_). I definitely think the opportunity is there, but it definitely needs to be talked through before any implementation is created.

## General Approach

The general approach that I'm considering is probably best illustrated through an example.  Consider the following html:

```html
<html lang="en">
<head>
<title>Super Simple Test</title>
</head>
<body>
<script src="js/localo.js"></script>
<script>
function loadComplete() {
    alert('I have loaded all the things');
}

var packages = [
    'test-package:0.1.2', 'http://remotesite.com/packages'
];

localo(packages, loadComplete);
</script>
</body>
</html>
```

The call to `localo` at the bottom of the page is telling our localo resource loader that our application code on the page requires `test-package` version `0.1.2`.  

___NOTE:___ _Versioning is key in implementation of localo and the  [semver](http://semver.org/) specification will be followed and [Isaac  Schlueter's](http://twitter.com/izs) [JS implementation](http://github.com/isaacs/node-semver) will be used._

While the implementation of the `localo` script loader is still something I'm working out, I do have a clearer idea on what might be contained within the package files:

```js
localo.define({
    name: 'test-package',
    version: '0.1.2'
});
```

This file would be available online at the following url ([http://remotesite.com/packages/testpackage-0.1.2.js](https://raw.github.com/DamonOehlman/localo/master/demo/packages/testpackage-0.1.2.js)). You will notice that the package file contains no code at all, and while in the case above seems largely redundant exists for the purpose of defining dependencies, etc.  Well that's the thinking anyway.

So once localo knows what it is that it is meant to load, and the version that is required, it checks whether it has a version of the package manifest available locally.  While in time there might be IndexedDB versions of this storage, the primary target is definitely localStorage.

If it has the resources locally it loads the manifest and injects the specified JS and CSS (others?) into the DOM.  An example (and oversimplified) manifest file is shown below:

```js
localo.manifest('test-package', '0.1.2', {
    scripts: [
        '// script goes here, but needs to be all on a singe line\nalert(\'hello\');'
    ],
    
    css: [
    ]
});
```

The contents of the manifest (3 argument) are designed to be very JSON serializable and thus suitable for storage.

## Supporting Tools and Infrastructure

If you are looking through what is proposed so far, and thinking well that sounds good, but there is no way I'm going to package my files in the way you are suggesting, then I think that's a reasonably thought.

It's for this reason that I believe for what is being suggested here to be successful, that localo will need to include both a simple command-line tool that will be used to package resources and perhaps also an online site that can take care of packaging for you.

Additionally, I think an online centralised locator service would be a great way to locate packages distributed around the web, this would mean that a package could be required without having to specify a specify remote repository for the repo, and potentially a repository that is close to you topographically could be chosen.

## Thoughts?

I'm going to get working on an example implementation of this hopefully soon, but would love some feedback and potential things to watch out for.  Given the broad support for localStorage I feel that it's achievable in most modern browsers and should behave more reliably than AppCache in the long term (due to the having versioning at a more granular level and intelligently implemented).

I'm sure I've missed things though, and would love peoples thoughts or requests for more clarification around particular aspects here.

Feel free to create an issue against the repository or hit me up on [twitter](http://twitter.com/DamonOehlman) with any thoughts. It would be really appreciated :)


