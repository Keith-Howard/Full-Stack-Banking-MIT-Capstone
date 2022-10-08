# Good-Bank-Three-Tier-Application

This Application was written for a MIT Assignment. Intended to convert a front end banking application that used a single page application format and convert it to a three tier app. This project can be used as an example for someone who is looking for a pretty simple way of implementing a three tier app, with some authentication and authorization. 

# Installation Guidelines
1. In VS Code create a file directory for your project
2. Fork the Repo to your GitHub
3. Clone the Repo to your local machine
4. In your terminal run NPM Init -y to generate Node application for your app with default settings
5. Download the source files and move them to the directory you created
6. Run NPM install so that all of the packages in the Packages.json file are installed
7. Download Studio 3T for MongoDB and Docker and start them
8. Run node index.js in the terminal to start the server and then go to the port that the console log directs you to

![homeScreenB4Login](https://user-images.githubusercontent.com/54951171/191431464-fe479ec7-0025-4ebd-b299-af8baeb41b30.JPG)
*Home Screen before logging in
![createAccount](https://user-images.githubusercontent.com/54951171/191431639-36053a9d-a0c0-4dbe-b9fa-7346b8054b3e.JPG)
*Create Account
![useralreadyexists](https://user-images.githubusercontent.com/54951171/191432100-58abdd2c-10b8-4d4e-a760-ff666405de9c.JPG)
*Create Account Error message 
![login](https://user-images.githubusercontent.com/54951171/191431731-56629258-eafa-45f4-a510-e0e24edd9b57.JPG) 
*Before Logging in
![successfulLogin](https://user-images.githubusercontent.com/54951171/191432028-bd03df4a-746f-45f8-a40b-312d21933d19.JPG)
*After Logging in
![depositedscreenshot](https://user-images.githubusercontent.com/54951171/191432217-d143617d-c4b7-4f14-9061-769e692dce32.JPG)
*After Successful Deposit
![balancepage](https://user-images.githubusercontent.com/54951171/191432298-7c7aa88d-9651-46a7-a939-a0393b3a2ff5.JPG)
*Balance Page
![alldata](https://user-images.githubusercontent.com/54951171/191432348-fe705b3e-f4e5-4c24-b841-7c5a5f534e80.JPG)
*All Data Page
![logout](https://user-images.githubusercontent.com/54951171/191432417-0a91343b-e2bd-49bb-bbf5-d8ff478b273a.JPG)
*After you Click Logout 
![studio3T](https://user-images.githubusercontent.com/54951171/191432510-ec78a9c8-1705-4aea-97fc-7b691f3f700e.JPG)
*Studio 3T for MongoDB

# Technology Used
Front end:
-React
Server:
-Express.JS
-Node.js
-Firebase
Data Store:
-MongoDB
-Docker Container

# Features
When the bank home page loads the user only has the Home, Create Account and Login links available to them. Not until they successfully login do they have access to exclusively Home, Deposit, Withdraw, Balance, All Data and Logout. A User is able to deposit and withdraw from their balance, they can check their balance and go to page that displays all of their personal account data. The app uses authentication on the create account to set new users up with tokens. Upon logging in the use retrieves their access token to make future transactions.

I was unable to authenticate transactions. I tried to implement this and will work towards making that feature of the app available. I would also like to make hiding the links more visually appealing. Currently when links are hidden the other links do not take their place. The links are hidden in their respected spots on the navbar leaving vacancies on it.

Project License: ISC

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
