var GithubSearch = require('./../js/results-interface.js').githubSearchModule;

$(function(){
    var githubSearch = new GithubSearch();

    $("button").click(function(){
        var searchName = $("#searchName").val();
        response= githubSearch.search(searchName);
        console.log(response);
        // console.log(JSON.stringify(response));
        // console.log(githubSearch.muffins);
    });
});
