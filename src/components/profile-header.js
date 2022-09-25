import underlineSrc from "../assets/underline.svg";
import { randomDarkColor } from "../utils";

export const updateProfileInformation = (data) => {
  const { firstName, lastName, avatarSrc } = data;
  const headerNode = document.querySelector("#profile-header .profile-header");
  const profileAvatarNode = headerNode.querySelector("img");
  const nameNode = headerNode.querySelector(".profile-info .profile-info-name");
  const underlineNode = headerNode.querySelector(".profile-underline");

  underlineNode.setAttribute("src", underlineSrc);

  nameNode.classList.remove(
    "loading",
    "skeleton-block",
    "skeleton-block--half"
  );

  nameNode.innerHTML = `${firstName} ${lastName}`;
  nameNode.appendChild(underlineNode);
  profileAvatarNode.src = avatarSrc;
  profileAvatarNode.setAttribute("aria-label", `${firstName} ${lastName}`);

  if (!avatarSrc) {
    profileAvatarNode.remove();
    const profileNoAvatar = headerNode.querySelector(".profile-avatar");
    
    const randomColor = randomDarkColor[Math.floor(Math.random()*5)];
    const avatarImg = document.createElement("div");
    avatarImg.style.backgroundColor = randomColor;
    avatarImg.setAttribute("class", "no-img");

    const avatarInitials = document.createElement("p");
    avatarInitials.setAttribute("class", "initials page-heading-1");
    avatarInitials.innerHTML = firstName.substring(0,1) + lastName.substring(0,1);

    avatarImg.appendChild(avatarInitials);
    profileNoAvatar.appendChild(avatarImg);
  }
};
