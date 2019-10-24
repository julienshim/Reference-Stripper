import React from "react";

export default ({ isDark }) => {
  const svgStyle = {fill: "rgba(204, 204, 204, 0.8)"}
  const note = (
    <svg
      style={svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-5-1.386h-10v-1h10v1zm0-4h-10v1h10v-1zm0-3h-10v1h10v-1z" />
    </svg>
  );
  const noteDark = (
    <svg
      style={svgStyle}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M22 13v-13h-20v24h8.409c4.857 0 3.335-8 3.335-8 3.009.745 8.256.419 8.256-3zm-4-7h-12v-1h12v1zm0 3h-12v-1h12v1zm0 3h-12v-1h12v1zm-2.091 6.223c2.047.478 4.805-.279 6.091-1.179-1.494 1.998-5.23 5.708-7.432 6.881 1.156-1.168 1.563-4.234 1.341-5.702z" />
    </svg>
  );
  return (
    <p
      className={isDark ? "dark" : ""}
      style={{
        position: "absolute",
        top: "0",
        right: "24",
        padding: "5px 10px"
      }}
    >
      {isDark ? noteDark : note}
    </p>
  );
};
