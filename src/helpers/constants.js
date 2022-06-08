const storageURL =
  "https://res.cloudinary.com/sharath-media-library/image/upload";
const storageFolder = "social%20media";
export const constants = {
  imgUrls: {
    userPlaceholder: `${storageURL}/v1653724138/${storageFolder}/user-default_idyg7v.jpg`,
    appLogo: `${storageURL}/v1653581502/${storageFolder}/sm-logo_ukggxg.png`,
    reactLogo: `${storageURL}/v1653754223/${storageFolder}/icons8-react-native_srgtib.svg`,
    firebaseLogo: `${storageURL}/v1653754223/${storageFolder}/icons8-firebase-48_m64sqd.png`,
    reduxLogo: `${storageURL}/v1653754223/${storageFolder}/icons8-redux-48_whl4yx.png`,
    tailwindLogo: `${storageURL}/v1653754223/${storageFolder}/tailwind-css_mzocmr.svg`,
    hashnodeLogo: `${storageURL}/v1653755115/${storageFolder}/icons8-hashnode-48_mckcy7.png`,
    githubLogo: `${storageURL}/v1653755115/${storageFolder}/icons8-github-48_ov0ftw.png`,
    linkedinLogo: `${storageURL}/v1653755115/${storageFolder}/icons8-linkedin-2-48_smjbd0.png`,
    twitterLogo: `${storageURL}/v1653755115/${storageFolder}/icons8-twitter-48_ukzjgp.png`,
    invalidUser: `${storageURL}/v1654159858/${storageFolder}/user-invalid-icon_oyylty.png`,
    userCoverPlaceholder: `https://via.placeholder.com/468x60?text=No`,
  },
};

export const capitalize = (name) => {
  const words = name.split(" ");
  const capitalWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const actualWord = capitalWords.join(" ");
  return actualWord;
};
