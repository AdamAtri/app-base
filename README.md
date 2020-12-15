# app-base
The app-base requires NativeScript cli ver. 6.7.8;

(my-globals: {    
  &nbsp;&nbsp;`node: v12.18.2`,  
  &nbsp;&nbsp;`npm: 6.14.9`,  
  &nbsp;&nbsp;`nativescript: 6.7.8`,  
});

To install NativeScript:  
`npm i -g nativescript@6.7.8`  

Then follow the instructions that arise from running  
`tns doctor`

## Once {N}ativescript is setup
To install app dependencies:  
`npm i`

To start the server:  
`npm run api-server`  

To start the app:  
`tns <debug|run> <android|ios>`

## When you're ready to code
Please create a branch and push all code changes to it.  
`git checkout -b <your-name>`  
`git push -u origin <your-name>`  
