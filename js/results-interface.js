var apiKey = require('./../.env').apiKey;

function GithubSearch(){

}
GithubSearch.prototype.search = function(searchName){
    $.get('https://api.github.com/users/' +searchName +'?access_token=' + apiKey).then(function(response){
        $("#userName").text(response.login);
        $("#fullName").text(response.name);
        $("#email").text(response.email);
        $("#link").attr("href", response.html_url);
        $("#avatar").attr("src", response.avatar_url);
        $.getJSON(response.repos_url, function(data){
            // var items = [];
            $.each(data, function(key, value){
                console.log(key, value);
                $("#repos").append("<li>"+value.name+"</li>")
            });
        });
        // respos.responseJSON;
        console.log(repos);
    }).fail(function(error){
        console.log(error.responseJSON.message);
        alert("sorry, no username was found with the name" + searchName+" , please try again.");
    });
};

exports.githubSearchModule = GithubSearch;
