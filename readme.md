# About

This simple application is made up of three functions on the middleware stack :

<ol>
  <li> <em>The logger</em> - This outputs the requested URL and the time it was requested to the console . It'll always continue on to the next middleware. ( In terms of code it will always call next).</li>
  <li>  <em>The static file sender</em> - This checks if the file exists in the folder. If it does, it'll send the file over the internet. If the requested file does not exist, it'll continue on the final middleware (once again, calling next).</li>
  <li> <em>The 404 handler</li> - If this middleware is hit, it means that the previous one did not find a file, and should return a 404 message before finishing up the request.
</ol>
