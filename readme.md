# inject-env-browser-run
> It injects environment variables into your browser index.html

## Why?
Browser doesn't have runtime access to the environment variables.
So when we try to dockerize Frontend projects we intend to use --build-args to pass the variables to the image in build-stage. But this couples our images with environment it was built for.

**For example:** A project that requires an `API_URL` and will be deployed to dev, staging, qa and production environments will have to be built 4 times for every environment. Every time you release a new version of your application you will have to provide 4 different images.

More explantion:
- [How to use environment variables to configure your Angular application without a rebuild](https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/)
- [How to implement runtime environment variables with create-react-app and Docker](https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/)

Solution:
> define your required variables. and inject this cli in your CMD and it will generate a file called `env-config.js` you could load into your html files and it will add an object called `_env_` to your `window` object.

## Install

```
$ npm install inject-env-browser-run
```

## Demo
Check the `demo/` folder for more guidance.

## Config
You have to define a list of the `required` variables.
```json
In package.json

"inject-env-browser-run": {
  "required": [
    "HOST",
    "BLOG_HOST",
    "DEBUG_LEVEL",
    "APP_TITLE"
  ]
}
```

## Usage

```js
const injectEnvBrowserRun = require('inject-env-browser-run');

injectEnvBrowserRun('src/foo/bar');
//=> 'creates an `env-config.js` file in the path src/foo/bar'
```
Then load `env-config.js` in your html file.

*Note: don't bundle it in your JS bundle*


## API

### injectEnvBrowserRun(dest)

#### dest

Type: `string`

the destination where the env-config file will be created

## CLI

```
$ npm install --g inject-env-browser-run
```

```
$ inject-env-browser-run --help

	Usage
		$ inject-env-browser-run

	Options
		--dest  the destination where the env-config file will be created [Required]

	Examples
		$ inject-env-browser-run --dest=src/foo/bar
    creates an `env-config.js` file in the path src/foo/bar
```
