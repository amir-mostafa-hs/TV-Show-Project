// Get Main Content
const mainContent = document.querySelector(".mainContent");
// Func Create Video Card
function createVideoCard(
  videoId,
  imgSrc,
  imgAlt,
  smalDetails,
  episodeNum,
  dateNum,
  scoreNum,
  videoName,
  videoTime
) {
  // Aside Video Card
  const aside = document.createElement("aside");
  aside.id = videoId;
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
  const arraySmalDetails = smalDetails.split(" ").splice(0, 13).join(" ");
  p.textContent = `${arraySmalDetails} ...`;
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
  const spanEpisode = spanElem(
    episodeNum,
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
  const btnTimeIconOne = iElem("bi bi-play-circle playBtnIconOne");
  btnTime.append(btnTimeIconOne);
  const btnTimeIconTwo = iElem("bi bi-play-circle-fill playBtnIconTwo");
  btnTime.append(btnTimeIconTwo);
  divBtn.append(btnTime);
  const btnTimePopUp = divElem();
  btnTimePopUp.className = "videoCardTimeBtnPopUp bg-danger";
  const btnTimePopUpSpan = spanElem(`${videoTime}Min`);
  btnTimePopUp.append(btnTimePopUpSpan);
  divBtn.append(btnTimePopUp);
  // Appending
  figure.append(divBtn);
  aside.append(figure)
  mainContent.append(aside);
}

createVideoCard(
  167,
  "https://static.tvmaze.com/uploads/images/original_untouched/8/21962.jpg",
  "Seeing Things",
  "Former Louisiana State CID partners Martin Hart and Rustin Cohle give ... test test test",
  "S01E02",
  "2014-01-19",
  8.8,
  "Seeing Things",
  60
);

createVideoCard(
  167,
  "https://static.tvmaze.com/uploads/images/original_untouched/8/21962.jpg",
  "Seeing Things",
  "Former Louisiana State CID partners Martin Hart and Rustin Cohle give ...",
  "S01E02",
  "2014-01-19",
  7.8,
  "Seeing Things",
  65
);

