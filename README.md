**This application no longer works, because the APIs it uses have been deprecated**

- Twitter: [API v1 Retirement: Final Dates](https://blog.twitter.com/2013/api-v1-retirement-final-dates)
- Facebook: [FQL and REST APIs are no longer available in v2.1](https://developers.facebook.com/docs/apps/changelog#v2_1_deprecations)

Here is an [article](https://www.bram.us/2016/01/11/getting-the-share-count-of-a-url/) on how to get the share count of a URL as of January, 2016.

## Amo ##

Amo is a simple service to provide you with the up to date share count of a given url in the major social networks. Currently includes only Facebook and Twitter.

 1. **Clone:** git clone git://github.com/OpenNewsLabs/amo.git
 2. **Navigate to repo:** cd amo
 3. **Install dependencies:** yarn install
 4. **Start server:** node app
 5. **Q the service:** localhost:1337/?q=http://www.example.com