import { removeChildNodes, randomDarkColor } from "../utils";

/**
 * Function which generates a single Card node based on a dataset
 *
 * @param {object} data data containing attributes of a card
 * @return {Node} generated markup for a card
 */
const generateCardNode = (data) => {
  const {
    authorFirstName,
    authorLastName,
    authorAvatarSrc,
    jobTitle,
    companyName,
    post,
    publishDate,
    city,
    state
  } = data;
  const templateId = "profile-post-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const authorName = clone.querySelector(".post-author-info .page-paragraph");
  const jobDesc = clone.querySelector(".post-author-info .page-micro");
  const postNode = clone.querySelector(".post-content");
  const avatarNode = clone.querySelector(".post-author-avatar");
  const dateNode = clone.querySelector(".post-publish-info .post-publish-date")
  const locationNode = clone.querySelector(".post-publish-info .post-location")

  let date = new Date(publishDate)
  date = date.toLocaleDateString("en-US")

  authorName.innerHTML = `${authorFirstName} ${authorLastName}`;
  jobDesc.innerHTML = `${jobTitle} @ ${companyName}`;
  postNode.innerHTML = post;
  dateNode.innerHTML = date;
  locationNode.innerHTML = `${city}, ${state}`;

  if (authorAvatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = authorAvatarSrc;
    avatarImg.setAttribute(
      "aria-label",
      `${authorFirstName} ${authorLastName}`
    );
    avatarNode.appendChild(avatarImg);
  } else {
    const randomColor = randomDarkColor[Math.floor(Math.random()*5)];
    const avatarImg = document.createElement("div");
    avatarImg.style.backgroundColor = randomColor;
    avatarImg.setAttribute("class", "no-img");
    
    const avatarInitials = document.createElement("p");
    avatarInitials.setAttribute("class", "initials page-heading-1");
    avatarInitials.innerHTML = authorFirstName.substring(0,1) + authorLastName.substring(0,1);

    avatarImg.appendChild(avatarInitials)
    avatarNode.appendChild(avatarImg);
  }

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generatePinnedPostsFromTemplate = (resultsData) => {
  const pinnedPostsList = document.querySelector(
    "#profile-posts .profile-post-results"
  );

  removeChildNodes(pinnedPostsList);

  if (resultsData.pinnedPost) {
    const postNode = generateCardNode(resultsData.pinnedPost);
    pinnedPostsList.appendChild(postNode);
  }
};
