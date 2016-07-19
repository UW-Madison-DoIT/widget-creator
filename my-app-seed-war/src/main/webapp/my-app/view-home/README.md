This is just an example directory, but you can have many of these in your project

### File Structure

+ partials/\*.html (all your partials, including route partials and directives)
+ controllers.js (controllers for this module go here)
+ directives.js (directives for this module go here)
+ services.js (services go here)
+ routes.js (More about routes below)

### Routes

Routes is a simple json object. There can be one or many. You are encouraged to use one route per module or "view." 
This file is used to tell your app where to look for this module/view in main.js. Look there for more information.

### Paths

To add an additional route to this module (ex. A single module may have a "summary" page and "detail" page that each use a separate route):

+ Give the route a sensible name
+ Use the `require.toUrl('./partials/example.html')` with a relative path from the file you are writing it in
+ Add the route to the `.config` section in `main.js`

