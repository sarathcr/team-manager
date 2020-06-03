# ThinkoCreator

## Run static scripts

Execute the command to generate static files
```
docker-compose up -d
```

or preventing permissions problems in Unix systems
```
export UID; docker-compose up -d
```

Check the logs to assure that static files rendering has finished:
```
 docker-compose logs -f
```

Access at http://localhost:8080


## Upload to S3

There's a provisional script to upload the static files into a privisional S3 bucket. 

**Note**: Check before the AWS requirements 


```shell script
ops/upload_statics_to_s3.sh
``` 

The S3 site is published under CloudFront distribution at http://d18ta45l1rv296.cloudfront.net/

### AWS requirements

To upload to S3 you must have installed and configured the AWS CLI with an AWS profile named "thinko", like this:

```shell script
# cat ~/.aws/credentials

[thinko]
aws_access_key_id = XXXXXXXXX
aws_secret_access_key = YYYYYYYY
```

```shell script
# cat ~/.aws/config

[profile thinko]
region = eu-west-3
```

##  DevOps - Set up steps

Angular project set up
```
npm install -g @angular/cli
ng new thinko-creator
cd thinko-creator
```

Add git remote
```
git remote add origin https://gitlab.opentrends.net/tk004-thinko_elearning/tk004-thinko_creator.git
```

Add components
```
ng g c home
ng g c route-a
ng g c nav
```

Add prerender by universal component
```
ng add @nguniversal/express-engine --clientProject thinko-creator
npm run prerender
```
 

# Angular CLI README

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
