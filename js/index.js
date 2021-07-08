document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#github-form").addEventListener("submit", (e) => {
        e.preventDefault(); 
        console.log(e); 
        if(document.querySelectorAll('.users') != undefined && document.querySelectorAll('.repoDiv') != undefined){
            clearResults(); 
        }
        let name = e.target[0].value
        searchName(name);

        // console.log(e); 
        // console.log(document.querySelector("#pic"))

        
    })
})

function searchName(name){
    fetch(`https://api.github.com/search/users?q=${name}`)
    .then(response => response.json())
    .then(data => {
        console.log(document.querySelectorAll('.users'))
        data.items.forEach(displayNames)
    })
}

function displayNames(data){
    let username = document.createElement("h2");
    let avi = document.createElement("img");
    avi.id = "pic"; 
    let linebreak = document.createElement("br"); 
    let url = document.createElement("a");
    let repos = [];
    let div = document.createElement("div");
    div.className = 'users';
    username.textContent = data.login;
    avi.src = data.avatar_url;
    url.textContent = data.html_url; 
    url.setAttribute("href", data.html_url); 
    //console.log(repos); 
    div.append(username,avi,linebreak, url, repos)

    div.addEventListener('click', (e) => {
        console.log('clicked!')
        //console.log(data); 
        fetch(`https://api.github.com/users/${data.login}/repos`)
        .then(response => response.json())
        .then(json => {
            console.log(json); 
            json.forEach(element => addRepos(element)); 
        })
    })
    //console.log(div); 
    document.querySelector("#user-list").append(div);
}

function clearResults(){
    document.querySelectorAll('.users').forEach(element => {
        element.remove();
    })
    document.querySelectorAll('.repoDiv').forEach(element => {
        element.remove(); 
    })
}

function addRepos(data){
    let name = document.createElement("h4");
    let html_url = document.createElement("h4");

    let repoDiv = document.createElement("div");
    repoDiv.className = 'repoDiv';

    name.textContent = data.name;
    html_url.textContent = data.html_url; 
    html_url.setAttribute("href", data.html_url); 

    repoDiv.append(name, html_url); 
    document.querySelector('#repos-list').append(repoDiv); 
}

function func(data){
    // data.forEach(element => 
    //     fetch(`https://api.github.com/users/${element.login}/repos`)
    //     .then(response => response.json())
    //     .then(data => data.forEach(element => {
    //         addRepos(element); 
    //     }
    // )))
}