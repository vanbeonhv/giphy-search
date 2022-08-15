let inputValue = document.getElementById("inputValue");
let searchBtn = document.getElementById("search-btn");
let searchValue;
let apiKey = "dXZCSUDnhgpuqZ1neIzkakwWG4f0BSHo"; //Replace with your key
let url = `http://api.giphy.com/v1/gifs/search?`;
let imgContainer = document.querySelector(".img-container");
let linkList = [];

document.onkeydown = (e) => {
  if (e.key === "Enter") {
    searchBtn.onclick();
  }
};

searchBtn.onclick = () => search();

function getInputValue(obj) {
  searchKeyWord = obj.value;
}

function search() {
  getData(searchKeyWord);
}

function getData(searchKeyWord) {
  axios
    .get(url, {
      params: {
        q: searchKeyWord,
        api_key: apiKey,
      },
    })
    .then(function (response) {
      linkList.push(response.data.data[0].images.downsized.url);
    })
    .then(() => renderImg())
    .catch(() => alert("Error"));
}

function renderImg() {
  let html = "";
  linkList.map((imgLink) => {
    html += `<img src="${imgLink}" alt="" style="width: 300px; height: 300px">`;
  });
  imgContainer.innerHTML = html;
}

document.getElementById("remove-btn").onclick = () => removeAllImage();

function removeAllImage() {
  linkList = [];
  renderImg();
}
