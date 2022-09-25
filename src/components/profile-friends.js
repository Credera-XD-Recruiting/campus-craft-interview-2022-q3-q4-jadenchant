import { removeChildNodes } from "../utils";

/**
 * Function which generates a single list-item node based on a dataset
 *
 * @param {object} data data containing attributes of a listItem
 * @return {Node} generated markup for a card
 */
const generateListItemNode = (data) => {
  const { avatarSrc, name, jobTitle, companyName, topFriend } = data;
  const templateId = "friend-list-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const nameNode = clone.querySelector("p.page-paragraph");
  const titleNode = clone.querySelector("p.page-micro");
  const avatarNode = clone.querySelector(".profile-list-item-avatar");
  const topFriendNode = clone.querySelector("p.top-friend-flag");

  nameNode.innerHTML = `${name}`;
  titleNode.innerHTML = `${jobTitle} @ ${companyName}`;
  avatarNode.src = avatarSrc;
  avatarNode.setAttribute("aria-label", `${name}`);

  if(topFriend) {
    topFriendNode.innerHTML = "Top Friend";
  }

  if (avatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarSrc;
    avatarImg.setAttribute("aria-label", `${name}`);
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
export const generateFriendsListFromTemplate = (resultsData) => {
  const friendsListSection = document.querySelector(
    "#profile-friends .profile-friends-list"
  );

  if (resultsData.friends && resultsData.friends.length > 0) {
    removeChildNodes(friendsListSection);

    let sortedFriends = resultsData.friends.sort((a,b) => {
      if(a === b) {
        return 0;
      } else if(a.topFriend && !b.topFriend) {
        return -1;
      } else if(!a.topFriend && b.topFriend) {
        return 1;
      }

      const aLast = a.name.split(' ').slice(-1).join(' ');
      const bLast = b.name.split(' ').slice(-1).join(' ');

      return aLast < bLast ? -1 : 1;
    })

    for (let i = 0; i < sortedFriends.length; i++) {
      const friendsNode = generateListItemNode(sortedFriends[i]);
      friendsListSection.appendChild(friendsNode);
    }
  }
};
