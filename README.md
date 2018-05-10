# flipchart-compare-poc
A web application that are POC of this product compare page https://www.flipkart.com/mobile/compare?ids=MOBEMK62PN2HU7EE,MOBE3XZ7ZKRJZWSG

####  Technologies used in Server
<ul>
  <li> NodeJS/ExpressJS </li>
  <li> Mocha/Chai with Istanbul nyc </li>
</ul>

####  Technologies used in UI
<ul>
  <li> ReactJS with ReactStrap and FontAwesome</li>
  <li> SCSS/SASS </li>
  <li> Jest with Enzyme </li>
</ul>


#### To use the app. First start the server
<ol>
  <li> npm install </li>
  <li> npm start </li>
</ol>

#### To test the server
<ol>
  <li> npm test </li>
</ol>
This should also output the code coverage with Istanbul nyc html format

#### Then Start the client component, go into the client folder
<ol>
  <li> npm install </li>
  <li> npm run build-css </li>
  <li> npm start </li>
</ol>

#### To test the client
<ol>
  <li> npm test </li>
</ol>
This will run snapshot testing against ComparisonComponent and ComparisonTable using Enzyme


#### Make sure all npm statements executed successfully.
#### Then you should be able to access localhost:3000 and see the application running.