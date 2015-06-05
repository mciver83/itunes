var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    this.getArtist = function(artist, media){
    	var deferred = $q.defer();
    	$http({
    		method: 'JSONP',
    		url: 'https://itunes.apple.com/search?term=' + artist + '&media=' + media + '&callback=JSON_CALLBACK'
    	}).then(function(response){
    		var parsedData = response.data.results;
    		console.log(parsedData);
    		var arr = [];
    		for(var i = 0; i < parsedData.length; i++){
    			var item = {
    				AlbumArt: parsedData[i].artworkUrl60,
			        Artist: parsedData[i].artistName,
			        Collection: parsedData[i].collectionName,
			        CollectionPrice: parsedData[i].collectionPrice,
			        Play: parsedData[i].previewUrl,
			        Type: parsedData[i].kind
    			}
    			arr.push(item);
    		}
    		deferred.resolve(arr);
    	})
    	return deferred.promise;
    }

});