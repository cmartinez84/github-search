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
            $("ul#repos").append("<li>"+repo.name +"</li>")
            $("li").last().click(function(){
                var dateCreated = repo.created_at;
                 dateCreated = dateCreated.substring(0,10);
                var updatedAt = repo.updated_at;
                updatedAt = updatedAt.substring(0,10);
                if(repo.description){
                    var description = repo.description;
                }
                else{
                    var description = "no description";
                }
                $("h1#repoName").text(repo.name);
                $("#description").text(description);
                $("#dateCreated").text(dateCreated);
                $("#language").text(repo.language);
                $("#updatedAt").text(updatedAt);
                $("a#link").attr("href", repo.html_url);
            });
            // if(repo.description === null){
            //     output += " no description</li>";
            // }
            // else{
            //     output += repo.description + " </li>";
            // }

        })
        console.log(response);
    }).fail(function(error){
        console.log(error.responseJSON.message);
        alert("sorry, it does not look like this user has any repos. Tell them to get moving");
    });
};

exports.githubSearchModule = GithubSearch;
