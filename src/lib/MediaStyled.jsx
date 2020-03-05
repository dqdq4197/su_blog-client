

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    mobileXL: '482px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1300px',
    desktop: '2560px'
  }


export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    mobileXL: `(max-width: ${size.mobileXL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`, //폰트 사이즈 줄이기
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
  };