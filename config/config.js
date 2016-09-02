//Dont modify this file
//Copy this file as config and modify when deployed to new server and then start the app
//also dont chk modifed file in repo
module.exports = {
  "host": "ibm-iot.mybluemix.net:3000",
  "local_host": "localhost:3000",
  "cloud-host": "ibm-iot.mybluemix.net",
  "SalesDatabase": {
     "provider": "Cloudant",
	   "host": "cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix.cloudant.com",
	   "port": 443,
	   "user": "cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix",
	   "Password": "b19ce390696f85adbf717d16f8932eda82d24abe379816ed5c8757f605cf6491",
	   "url": "https://cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix:b19ce390696f85adbf717d16f8932eda82d24abe379816ed5c8757f605cf6491@cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix.cloudant.com",
	  "dbNameOld": "erpsalesdata",
    "dbName": "erpsaleswithstatecode"
   },
   "WashDailyAggregateDatabase": {
     "provider": "Cloudant",
	   "host": "cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix.cloudant.com",
	   "port": 443,
	   "user": "cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix",
	   "Password": "b19ce390696f85adbf717d16f8932eda82d24abe379816ed5c8757f605cf6491",
	   "url": "https://cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix:b19ce390696f85adbf717d16f8932eda82d24abe379816ed5c8757f605cf6491@cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix.cloudant.com",
	   "dbName":"devicedata_v1",
	   "dbName_1000": "changeddevicedata1000",
     "dbName_1lac": "devicedatanew",
     "dbName_1k": "newupdate1000data"
   },
   "RegionLatituesLongitudes": {
     "provider": "Cloudant",
	   "host": "cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix.cloudant.com",
	   "port": 443,
	   "user": "cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix",
	   "Password": "b19ce390696f85adbf717d16f8932eda82d24abe379816ed5c8757f605cf6491",
	   "url": "https://cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix:b19ce390696f85adbf717d16f8932eda82d24abe379816ed5c8757f605cf6491@cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix.cloudant.com",
	   "dbName": "dbgeocode"
   },
   "DeviceData1000": {
     "provider": "Cloudant",
	   "host": "cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix.cloudant.com",
	   "port": 443,
	   "user": "cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix",
	   "Password": "b19ce390696f85adbf717d16f8932eda82d24abe379816ed5c8757f605cf6491",
	   "url": "https://cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix:b19ce390696f85adbf717d16f8932eda82d24abe379816ed5c8757f605cf6491@cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix.cloudant.com",
	   "dbName": "washdatafailedwashes"
   },
   "NotificationConfig": {
     "provider": "Cloudant",
	   "host": "cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix.cloudant.com",
	   "port": 443,
	   "user": "cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix",
	   "Password": "b19ce390696f85adbf717d16f8932eda82d24abe379816ed5c8757f605cf6491",
	   "url": "https://cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix:b19ce390696f85adbf717d16f8932eda82d24abe379816ed5c8757f605cf6491@cf7a7fa8-910e-4f7f-90f8-0c1a70e6d052-bluemix.cloudant.com",
	   "dbName": "notificationconfigdb"
   } 
};