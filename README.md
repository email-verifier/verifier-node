# Official Library for verifier.meetchopra.com

# Installation

```npm i verifier-node```

or

```git clone https://github.com/email-verifier/verifier-node.git```

# Usage
Verifier-node is email library for validating non-exsistent, invalid domain, disposable emails. [Know more](https://verifier.meetchopra.com)


Below is the example of how to use the library

```javascript
const emailVerifier = require("email-verifier-node");

emailVerifier.verify("email@example.com", "ACCESS_TOKEN")
  .then(response => {
    console.log(response.valid()); // Boolean
    console.log(response.field("status")); // Access any field in response
  });
```