## My UW App Seed

[![Build Status](https://travis-ci.org/UW-Madison-DoIT/my-app-seed.svg)](https://travis-ci.org/UW-Madison-DoIT/my-app-seed)

This is a seed project intended to be used as a template for creating applications in My UW in a new way. 

Rather than creating a Portlet, developers can clone this project and write a Servlet 3 web application
that can deployed with My UW Madison.

### Requirements

This application assumes you are familiar with Maven, have it installed, and have a settings.xml
appropriate for interacting with UW's [Maven Artifact Repository](https://wiki.doit.wisc.edu/confluence/pages/viewpage.action?spaceKey=ST&title=Maven+Repository+Manager).

### Getting started

1. `git clone git@github.com:UW-Madison-DoIT/my-app-seed.git your-app-name`
2. `cd your-app-name`
3. `mvn install jetty:run`

Point your browser at http://localhost:8080 and you'll see the familiar My UW frame.

### Adding your content

The unique aspect about this project is that it overlays [angularjs-portal-frame](https://github.com/UW-Madison-DoIT/angularjs-portal).
That project provides us the frame that My UW uses: the header, the sidebar, and the footer. It provides
us an extension point in a file with a specific name: [main.js](my-app-seed-war/src/main/webapp/my-app/main.js).

That file is expected to be a [require.js](http://requirejs.org/) module, i.e. enclosed within a `define()` function.  RequireJS can be 
used to include more javascript resources from within [my-app.js](my-app-seed-war/src/main/webapp/my-app.js). 
For example:
```javascript
var myWidget = require(['my-widget.js'], function() {
  alert('Require runs my-widget.js first, and then this function.');
});
```
For detailed information, see the [require.js quickstart guide](http://requirejs.org/docs/start.html) and [API documentation](http://requirejs.org/docs/api.html).

In main.js, you can see that we reference a variable named `app`. This variable is the result of [angular.module](https://docs.angularjs.org/api/ng/type/angular.Module)
that was provided by angularjs-portal-frame.

With that reference we can use Angular to register app-specific controllers, services, directives, etc.

The example in this project does a number of things:

+ The `define` block includes all of the necessary routes, controllers, services, etc. that we need for our app to run. 
Every time you add a new view/module, you will want to include its various components here.
+ The `var app` declaration includes the pieces that the angular application needs to know about.
+ The `app.config` block establishes routes that the application needs to know about. Whenever you add a new module/view, you 
will need to add its route here and in the `/WEB-INF/web.xml` file in order for your application to find it.
+ The `app.config` block also instantiates and initializes the color palettes to be used by Angular Material elements 
(i.e. anything with the "md-" prefix). See [Angular Material - Configuring a Theme](https://material.angularjs.org/latest/Theming/03_configuring_a_theme) 
for more information. 

### Why is this a multi-module project?

Generally, projects that use this seed are a little larger in nature and have other modules encapsulating parts
of the code base. You would see other modules that are siblings of the war module like:

* api
* impl
* security
* integration

For even better encapsulation and decoupling, you could consider factoring these modules into their own repositories, even independently semantically versioned.
