var apiKey = require('./../.env').apiKey;

function GithubSearch(){
}
GithubSearch.prototype.search = function(searchName){
    $.get('https://api.github.com/users/'+searchName+'?access_token=' + apiKey).then(function(response){
        var stuff = JSON.stringify(response);
        $(".well").append("<div>"+stuff+"</div>");
    }).fail(function(error){
        console.log(error.responseJSON.message);
        alert("sorry, no username was found with the name" + searchName+" , please try again.");
    });
};

exports.githubSearchModule = GithubSearch;
