express-docs
=====================

This is a heavily-modified fork of [express-mongoose-docs](https://github.com/nabeel-ahmad/express-mongoose-docs) which removes the mongoose pieces and adds:

- configurable docs endpoint
- recursive route handling (carried PR from [here](https://github.com/nabeel-ahmad/express-mongoose-docs/pull/8/files))

It auto-generates API documentation from the code on runtime so the documentation always stays up to date.


Installation
--------------

* Step 1 : Install

```sh
npm install https://github.com/johnharris85/express-docs.git
```

* Step 2 : Configure

Add these lines to your app.js file

```sh
var docs = require("express-docs");
```

Make sure the following line comes after all express middleware such as app.use(express.json());

```sh
docs(app, "apiDocs"); // 2nd param is optional and is the path you want to serve the docs on.
```

That's it. The Docs web page should be accessible at <base_url>/<docs_route>.

Example: http://localhost:5000/apiDocs
