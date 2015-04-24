This is just an example directory, but you can have many of these in your project

### File Structure

+ partials/\*.html (all your partials both route partials and directives)
+ controllers.js (controllers for this module go here)
+ directives.js (directives for this module go here)
+ services.js (services go here)
+ more.js ( you can add more if you need it, this is just an example after all)
+ routes.js (More about routes below)

### Routes

Routes is a simple json object. There can be one or many. This file is used in main.js. Look there for more information.

### Paths

Use the `require.toUrl('./partials/my-app.html')` with a relative path from the file you are writing it in.
