newpost = () => document.getElementById("newpostpadding").style.display = "flex";


closenewpost = () => document.getElementById("newpostpadding").style.display = "none";
var videoPlayer = document.getElementById("videopadding");

stop = () => {
    document.getElementById("player").pause();
    videoPlayer.style.display = "none";
}

matchYoutubeUrl = (url) => {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false;
}

play = (file) => {
    if (matchYoutubeUrl(file)) {
        const URL = `https://vid.puffyan.us/api/v1/videos/${youtube}?fields=formatStreams`;
        fetch(URL).then(data => {
            return data.json();
        }).then(posts => {
            document.getElementById("videoPlayer").innerHTML = `<img src="images/close.png" class="close" onclick="stop()" /><video src="${posts.formatStreams[1].url}" controls autoplay id="player"></video>`;
            document.getElementById("player").play();
            videoPlayer.style.display = "flex";
        });
    } else {
        document.getElementById("videoPlayer").innerHTML = `<img src="images/close.png" class="close" onclick="stop()" /><video src="${file}" controls autoplay id="player"></video>`;
        document.getElementById("player").play();
        videoPlayer.style.display = "flex";
    }
}
document.getElementById("loader").style.display = "flex";
const videoList = document.getElementById("vidlist");
fetch(fURL, fOPTIONS).then(data => {
    return data.json();
}).then(posts => {
    document.getElementById("loader").style.display = "none";
    posts.slice().reverse().forEach(post =>
        videoList.innerHTML += `<li onclick="play('${post.link}')"><p>${post.title}</p></li>`
    );
});

function submit() {
    var title = document.getElementById("topic").value;
    var link = document.getElementById("subject").value;

    if (!topic || !subject) {
        alert("Fill all stuff")
    } else {
        const postData = {
            title: title,
            link: link
        };
        fetch("https://desertislandapi.suhasdissa.repl.co/videos", {
            method: 'POST', body: JSON.stringify(postData), headers: { 'Content-Type': 'application/json' }
        });
        closenewpost();
        alert("Done submittin! Your vid will appear here later");
    }
}