module.exports.twitternotifications = [
                         {      
                               "name":"Model3",
                               "full_count":160,
                               "twitter_count":120,              	
                        	 "Model": "Model3",
                        	 "Make": "Make1",
                               "Description":"Twitter sentiments",
                               "Value":70,
                               "Cutoff":"02/06/2016-10/07/2016",
                               "Tolerance":5,
                               "State":"New York",
                               "City":"New York",
                               "Zipcode":10001,
                        	 "Reason": "Not Happy with the programs",
                               "date":"06/07/2016",
                               "twitter_response_type":"Negative"
                         }
                       ];


module.exports.twitternotificationsspike = [
                         {      
                               "name":"Model3",
                               "current_connected_machines":80,
                               "previous_connected_machines":50,               
                               "Model": "Model3",
                               "Make": "Make1",
                               "Description":"Washing machine connectivity status",
                               "Value":10,
                               "Cutoff":"02/06/2016-10/07/2016",
                               "Tolerance":7,
                               "State":"New York",
                               "City":"New York",
                               "Zipcode":10001,
                               "Reason": "Not Happy with the programs",
                               "date":"06/07/2016"
                         }
                       ];  

module.exports.twitternotificationsspikeerror = [
                         {      
                               "name":"Model3",
                               "current_error_count":80,
                               "previous_error_count":50,               
                               "Model": "Model3",
                               "Make": "Make1",
                               "Description":"Washing machine connectivity status",
                               "Value":10,
                               "Cutoff":"02/06/2016-10/07/2016",
                               "Tolerance":7,
                               "State":"New York",
                               "City":"New York",
                               "Zipcode":10001,
                               "Reason": "Not Happy with the programs",
                               "date":"06/07/2016",
                               "error_type":"Water"
                         }
                       ];

module.exports.twitternotificationsspikeerrorbymake = [
                         {      
                               "make":"Make1",
                               "model":"Model2",
                               "reason":"Not happy with the programs",
                               "current_error_count":30,
                               "previous_error_count":25,
                               "error_type":"Sensor"
                         },
                         {      
                               "make":"Make2",
                               "model":"Model5",
                               "reason":"Errors",
                               "current_error_count":70,
                               "previous_error_count":55,
                               "error_type":"Software"
                         },{      
                               "make":"Make3",
                               "model":"Model8",
                               "reason":"Errors",
                               "current_error_count":60,
                               "previous_error_count":45,
                               "error_type":"Water"
                         }

                       ];   


//twitter inner page apis dummy data

module.exports.twitterinnerpageTwitterinsights = [
                         {      
                               "tweetsid":1,              
                               "make":"Make1",
                               "model":"Model3",
                               "tweets":50,
                               "likes":190,
                               "dislikes":18,
                               "followers":560,
                               "comments":123
                         },
                         {        
                               "tweetsid":2,             
                               "make":"Make2",
                               "model":"Model5",
                               "tweets":40,
                               "likes":160,
                               "dislikes":12,
                               "followers":670,
                               "comments":100
                         },
                         {        
                               "tweetsid":3,             
                               "make":"Make3",
                               "model":"Model8",
                               "tweets":50,
                               "likes":190,
                               "dislikes":150,
                               "followers":56,
                               "comments":12
                         },
                         {        
                               "tweetsid":4,             
                               "make":"Make3",
                               "model":"Model7",
                               "tweets":60,
                               "likes":200,
                               "dislikes":10,
                               "followers":600,
                               "comments":170
                         },
                          {        
                               "tweetsid":5,             
                               "make":"Make2",
                               "model":"Model5",
                               "tweets":45,
                               "likes":127,
                               "dislikes":5,
                               "followers":430,
                               "comments":125
                         },
                         {       
                               "tweetsid":6,              
                               "make":"Make1",
                               "model":"Model2",
                               "tweets":25,
                               "likes":50,
                               "dislikes":15,
                               "followers":260,
                               "comments":120
                         },
                         {        
                               "tweetsid":7,             
                               "make":"Make2",
                               "model":"Model5",
                               "tweets":90,
                               "likes":200,
                               "dislikes":20,
                               "followers":590,
                               "comments":120
                         }
                       ];   

module.exports.twitterinnerpagesentiments = [
                         {      
                               "twitterid":2,
                               "tweets_count":7,
                               "tweetsimpress_count":2300,
                               "profilevisits_count":997,
                               "mentions_count":10,
                               "twitter_count":248,
                               "tweets_percentage":69.3,
                               "tweetsimpress_percentage":81.8,   
                               "profilevisits_percentage":28.6,     
                               "mentions_percentage":23.1,  
                               "twitter_percentage":30,
                               "sentimate_positive":59,
                               "sentimate_neutral":27,
                               "sentimate_negative":16 

                         }
                       ];  

module.exports.twitterhandle = [
                         {      
                               "preferenceName":"Tweets",
                               "count":47,
                               "totalComments":66
                         },
                         {      
                               "preferenceName":"Re-Tweets",
                               "count":10,
                               "totalComments":66
                         }

                       ]; 




/*module.exports.twitterinnerpageTweetsimpressions = [
                         {      
                               "tweetsimpress_color":"red",
                               "tweetsimpress_count":2300,
                               "tweetsimpress_percentage":81.8             
                         }
                       ];    

module.exports.twitterinnerpageProfilevisits = [
                         {      
                               "profilevisits_color":"green",
                               "profilevisits_count":997,
                               "profilevisits_percentage":28.6             
                         }
                       ];    

module.exports.twitterinnerpageMentions = [
                         {      
                               "mentions_color":"red",
                               "mentions_count":10,
                               "mentions_percentage":23.1             
                         }
                       ];   

module.exports.twitterinnerpageTwitter = [
                         {      
                               "twitter_color":"red",
                               "twitter_count":248,
                               "twitter_percentage":30             
                         }
                       ];  


module.exports.twitterinnerpagesentimates = [
                         {      
                               "positive":59,
                               "neutral":27,
                               "negative":16            
                         }
                       ];  */


                           