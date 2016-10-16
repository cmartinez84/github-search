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
        console.log(response);
    }).fail(function(error){
        console.log(error.responseJSON.message);
        alert("sorry, no username was found with the name" + searchName+" , please try again.");
    });
};
GithubSearch.prototype.getRepos = function(searchName){
    $.get('https://api.github.com/users/' +searchName +'/repos?access_token=' + apiKey).then(function(response){
        $("#numberOfRepos").text(response.length);
        response.forEach(function(repo){
            var output = "<a href='"+ repo.html_url+"'><li>"+repo.name + "</a>:";
            if(repo.description === null){
                output += " no description</li>";
            }
            else{
                output += repo.description + " </li>";
            }
            $("ul#repos").append(output);
        })
        console.log(response);
    }).fail(function(error){
        console.log(error.responseJSON.message);
        alert("sorry, it does not look like this user has any repos. Tell them to get moving");
    });
};

exports.githubSearchModule = GithubSearch;
