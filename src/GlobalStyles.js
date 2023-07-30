import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@font-face {
font-family: "EuclidFlex";
src: url('/fonts/EuclidFlexRegular.ttf') format('truetype');
font-weight: 400;
}

@font-face {
font-family: "EuclidFlex";
src: url('/fonts/EuclidFlexBold.ttf') format('truetype');
font-weight: 700;
}

:root{
/* size */
--max-width:400px;
--vh: 100%;
/* 모바일 높이를 100%로 맞추기 위한 사이즈*/

/* colors */
--primary-color:rgba(255, 92, 1, 1);
--accent-color:rgba(154, 0, 0, 1);
--secondary-color:rgba(255, 237, 99, 1);
--tertiary-color:rgba(212, 217, 32, 1);

--content-text-color: rgba(136, 136, 136, 1);
--content-background-color: rgba(211, 211, 211, 1);
--content-border-color: rgba(104, 104, 104, 1);

--beginner-background-color: rgba(255, 237, 99, 0.3);
--intermediate-background-color: rgba(212, 217, 32, 0.3);
--fluent-background-color: rgba(255, 92, 1, 0.2);
--advanced-background-color: rgba(154, 0, 0, 0.1);

--disabled-color: rgba(0, 0, 0, 0.3);

/* fonts */
--default-font:"EuclidFlex";

/* border, padding */
--border-radius:1.3rem;
}

/* Reset.css */
html, body, header, main, footer, section, div, h1, h2, h3, h4, h5, h6, span, p, button, strong, a, form, ul, li{
margin:0;
padding:0;
font-family: var(--default-font);
box-sizing: border-box;
font-size:1rem;
font-weight: 400;
}

html, body{
  width: 100%;
  height: 100%;
}

a {
text-decoration: none;
color:black;
}

button{
background-color: none;
font-size:inherit;
}

strong{
color: var(--primary-color);
font-size:inherit;
font-weight: 700;
}

input{
appearance: none;
border: none;
background: none;
}

button{
background: inherit;
border:none;
box-shadow: none;
border-radius: 0;
padding:0;
overflow: visible;
cursor: pointer;
}

ui, li{
list-style: none;
}

`

export default GlobalStyle;