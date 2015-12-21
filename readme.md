# nara api evaluation
a node.js application written to help evaluate the [nara api](https://github.com/usnationalarchives/Catalog-API).


## installation
1. clone the repo to a local project directory
```bash
git clone -o github git@github.com:dan-nl/nara-api-eval.git
```

2. install dependant node modules in the project directory
```bash
cd nara-api-eval
npm install
```

3. follow the [config](#config) instructions.

4. start the application from the project directory
```bash
npm start
```

5. open a browser to the application url, [https://localhost:3000](https://localhost:3000).
note: you may need to accept the self-signed certificate by opening the advanced link.

## config
copy the development config example and adjust the `username` and `password` as appropriate.
```bash
cp app/config/development.example.js app/config/development.js
```

### env variables
there are 4 server environment variables that the application depends on; 3 can be hard coded in the config file or use server environment variables. `NODE_ENV` must be set as an environment variable. if you hard code the other 3, you don’t need to set them as environment variables.

as a quick reminder, on most linux machines, if your server user uses a bash shell, you can add the following export commands to the `.bash_profile` file in the  user’s home directory in order to have them set for every shell session.

#### server environment
```bash
export NODE_ENV=development
```

#### server ip address
```bash
export NODE_IP_ADDRESS=''
```

#### ssl
the application runs an https server, so it requires an ssl key and crt. [this article](https://devcenter.heroku.com/articles/ssl-certificate-self) will help you create a self-signed ssl certificate if needed. then set the following environment variables.
```bash
export SSL_KEY=/ssl.key.location
export SSL_CRT=/ssl.crt.location
```

## license
MIT

## contributors
[dan entous](https://github.com/dan-nl)