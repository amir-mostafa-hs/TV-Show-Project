// Get Main Content
const mainContent = document.querySelector(".mainContent");
// Func Create Video Card
function createVideoCard(
  videoId,
  imgSrc,
  imgAlt,
  smalDetails,
  seasonNum,
  episodeNum,
  dateNum,
  scoreNum,
  videoName,
  videoTime
) {
  // Aside Video Card
  const aside = document.createElement("aside");
  aside.id = videoId;
  aside.setAttribute("season", seasonNum);
  aside.setAttribute("episode", episodeNum);
  aside.className = "asideVideoCard";
  // Video Card Content
  const figure = document.createElement("figure");
  figure.className = "videoCard";
  // Func Create Div Elem
  const divElem = () => {
    return document.createElement("div");
  };
  // Video Card Image
  const divImg = divElem();
  divImg.className = "position-relative imgHover";
  const img = document.createElement("img");
  img.className = "img-thumbnail videoCardImage";
  img.src = imgSrc;
  img.alt = imgAlt;
  divImg.append(img);
  // Image Details
  const divImgHover = divElem();
  divImgHover.className = "imgDetails";
  const p = document.createElement("p");
  const editSmalDetails = smalDetails
    .replace("<p>", "")
    .split(" ")
    .splice(0, 12)
    .join(" ");
  p.textContent = `${editSmalDetails} ...`;
  divImgHover.append(p);
  divImg.append(divImgHover);
  // Func Create Span Elem
  const spanElem = (elemOrText, elemClass = "") => {
    const span = document.createElement("span");
    span.className = elemClass;
    span.append(elemOrText);
    return span;
  };
  // Video Card Episode
  seasonNum < 10 && (seasonNum = "0" + seasonNum);
  episodeNum < 10 && (episodeNum = "0" + episodeNum);
  const spanEpisode = spanElem(
    `S${seasonNum} - E${episodeNum}`,
    "position-absolute translate-middle badge rounded-pill bg-danger videoEpisode"
  );
  divImg.append(spanEpisode);
  // Video Card Date
  const spanDate = spanElem(
    dateNum,
    "position-absolute translate-middle badge rounded-pill bg-danger videoDate"
  );
  divImg.append(spanDate);
  // Func Create i Elem For Icon
  const iElem = (elemClass) => {
    const i = document.createElement("i");
    i.className = elemClass;
    return i;
  };
  // Video Card Score
  const spanScore = document.createElement("span");
  spanScore.className =
    "position-absolute translate-middle badge rounded-pill bg-danger videoScore";
  for (let step = 0; step < Math.round(scoreNum / 2); step++) {
    const iBadge = iElem("bi bi-star-fill videoScoreBadge");
    spanScore.append(iBadge);
  }
  spanScore.append(` ${scoreNum}`);
  divImg.append(spanScore);
  figure.append(divImg);
  // Video Card Name
  const figcaption = document.createElement("figcaption");
  figcaption.className = "videoName";
  figcaption.textContent = videoName;
  figure.append(figcaption);
  // Video Card Button
  const divBtn = divElem();
  divBtn.className = "videoCardBtn";
  // Video Card Play Buttom
  const btnPlay = document.createElement("button");
  btnPlay.type = "button";
  btnPlay.className = "btn bg-danger videoCardPlayBtn";
  const btnPlayIconOne = iElem("bi bi-play-circle playBtnIconOne");
  btnPlay.append(btnPlayIconOne);
  const btnPlayIconTwo = iElem("bi bi-play-circle-fill playBtnIconTwo");
  btnPlay.append(btnPlayIconTwo);
  divBtn.append(btnPlay);
  const btnPlayPopUp = divElem();
  btnPlayPopUp.className = "videoCardPlayBtnPopUp bg-danger";
  const btnPlayPopUpSpan = spanElem("Show");
  btnPlayPopUp.append(btnPlayPopUpSpan);
  divBtn.append(btnPlayPopUp);
  // Video Card Time Buttom
  const btnTime = document.createElement("button");
  btnTime.type = "button";
  btnTime.className = "btn bg-danger videoCardTimeBtn";
  const btnTimeIconOne = iElem("bi bi-clock playBtnIconOne");
  btnTime.append(btnTimeIconOne);
  const btnTimeIconTwo = iElem("bi bi-clock-fill playBtnIconTwo");
  btnTime.append(btnTimeIconTwo);
  divBtn.append(btnTime);
  const btnTimePopUp = divElem();
  btnTimePopUp.className = "videoCardTimeBtnPopUp bg-danger";
  const btnTimePopUpSpan = spanElem(`${videoTime}Min`);
  btnTimePopUp.append(btnTimePopUpSpan);
  divBtn.append(btnTimePopUp);
  // Appending
  figure.append(divBtn);
  aside.append(figure);
  mainContent.append(aside);
}

// Inpurt Data From Api
async function getApiData(url) {
  try {
    const apiData = await axios.get(url);
    return apiData;
  } catch (error) {
    console.error(error);
  }
}
// Get Selector
const videoSeasonSelect = document.getElementById("videoSeasonSelect");
const videoEpisodeSelect = document.getElementById("videoEpisodeSelect");
// Data Usage
getApiData("https://api.tvmaze.com/shows/5/episodes")
  .then((data) => {
    const seasonObj = {};
    const epicodObj = {};
    // Append Video Card
    Array.from(data.data).forEach((item) => {
      createVideoCard(
        item.id,
        item.image.original,
        item.name,
        item.summary,
        item.season,
        item.number,
        item.airdate,
        item.rating.average,
        item.name,
        item.runtime
      );
      seasonObj[item.season] = item.season;
      epicodObj[item.number] = item.number;
    });
    // Create Season Selector
    for (const key in seasonObj) {
      const createOption = () => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = `Season ${key}`;
        return option;
      };
      videoSeasonSelect.append(createOption());
    }
    // Create Episode Selector
    for (const key in epicodObj) {
      const createOption = () => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = `Episode ${key}`;
        return option;
      };
      videoEpisodeSelect.append(createOption());
    }
    // Show Video Details
    const aboutCloseBtn = document.querySelector(".closeBtn");
    aboutCloseBtn.addEventListener("click", () => {
      const aboutDiv = document.querySelector(".aboutDiv");
      aboutDiv.classList.add("hidden");
    });
    mainContent.addEventListener("click", (evt) => {
      if (
        evt.target.className === "btn bg-danger videoCardPlayBtn" ||
        evt.target.className === "bi bi-play-circle-fill playBtnIconTwo"
      ) {
        function getParent(child, parentClass) {
          if (child.parentNode.className.split(" ").indexOf(parentClass) >= 0) {
            const aboutDiv = document.querySelector(".aboutDiv");
            aboutDiv.classList.remove("hidden");
            Array.from(data.data).forEach((item) => {
              if (item.id === Number(child.id)) {
                const img = document.querySelector(".imgShow");
                img.src = item.image.original;
                img.alt = item.summary;
                const btn = document.querySelector(".showBtn");
                btn.addEventListener("click", () => {
                  btn.parentElement.addEventListener("submit", () => {
                    btn.parentElement.action = item.url;
                  });
                });
                const p = document.querySelector(".aboutDivText p");
                p.textContent = item.summary
                  .replace("<p>", "")
                  .replace("</p>", "");
              }
            });
          } else {
            getParent(child.parentNode, parentClass);
          }
        }
        getParent(evt.target.parentNode, "mainContent");
      }
    });
  })
  .then(() => {
    // Add Selectors Change Event
    videoSeasonSelect.addEventListener("change", () =>
      filterVideoCard(videoSeasonSelect.value, videoEpisodeSelect.value)
    );
    videoEpisodeSelect.addEventListener("change", () => {
      filterVideoCard(videoSeasonSelect.value, videoEpisodeSelect.value);
    });
    const filterVideoCard = (seasonValue, episodeValue) => {
      const allVideoCard = document.querySelectorAll(".asideVideoCard");
      Array.from(allVideoCard).forEach((card) =>
        card.classList.remove("hidden")
      );
      if (seasonValue) {
        Array.from(allVideoCard)
          .filter((card) => card.attributes.season.value !== seasonValue)
          .forEach((card) => card.classList.add("hidden"));
      }
      if (episodeValue) {
        Array.from(allVideoCard)
          .filter((card) => card.attributes.episode.value !== episodeValue)
          .forEach((card) => card.classList.add("hidden"));
      }
    };
  })
  .then(() => {
    // Create Live Search
    const allCard = document.querySelectorAll(".asideVideoCard");
    const inputSearch = document.querySelector("#inputSearch");
    function liveSearch() {
      for (const iterator of allCard) {
        if (
          iterator.textContent
            .toLowerCase()
            .includes(inputSearch.value.toLowerCase())
        ) {
          iterator.classList.remove("hiddenSearch");
        } else {
          iterator.classList.add("hiddenSearch");
        }
      }
    }
    let searchTimer;
    inputSearch.addEventListener("input", () => {
      clearInterval(searchTimer);
      searchTimer = setTimeout(liveSearch, 500);
    });
  });
