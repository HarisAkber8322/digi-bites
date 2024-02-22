import styled, { createGlobalStyle } from "styled-components";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
const GlobalStyles = createGlobalStyle`
  // your global styles
  body {
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
  .main_content {
  display: flex;
  overflow: hidden;
  position: relative;
}
`;
export const Header = styled.div`
  background-color: ${(props) =>
    props.theme === "light" ? "#f1f1f1" : "#343541"};
  color: ${(props) => (props.theme === "light" ? "#000" : "#ffffff")};
  /* text-align: center;
  height: 70px;
  position: fixed;
  z-index: 999999;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 17px;
  padding-right: 25px; */
  /* .navbar_logo {
    display: flex;
    align-items: center;
    grid-gap: 40px;
    .close_btn {
      font-size: 25px;
      border: 1px solid #157347;
      border-radius: 5px;
      padding-right: 10px;
      padding-left: 10px;
      height: 40px;
      transition: 0.5s all ease-in-out;
      &:hover {
        background-color: #157347;
      }
    } */
    /* img {
      height: 50px;
    } */
  /* } */
  /* .navbar_user {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    grid-gap: 40px;
    .dropdown-item:focus,
    .dropdown-item:hover {
      color: #ffffff !important;
      background-color: #157347 !important;
    }
    /* .dropdown-item {
      a {
        display: flex;
        width: 100%;
      }
    } */
  /* } */
  /* div ul {
    display: flex;
    grid-gap: 40px;
    font-size: 18px;
    font-weight: 600;
    align-items: center;

    li {
      transition: 0.5s all ease-in-out;
      &:hover a span {
        transition: 0.5s all ease-in-out;
      }
    }
  } */
`;
export const Content = styled.div`
  width: ${(properties) =>
    properties?.toggle === "true" ? "calc(100% - 80px)" : "calc(100% - 250px)"};
  transition: 0.5s all ease-in-out;
  background-color: #eeeeee;
  padding-top: 70px;
  margin-left: ${(properties) =>
    properties?.toggle === "true" ? "80px " : "250px"};
`;
export const sideBar = styled.div`
  width: ${(properties) =>
    properties?.toggleprop === "true" ? "80px" : "250px"};
  height: 100vh;
  background-color: #000;
  position: fixed;
  transition: 0.5s all ease-in-out;
  padding-top: 70px;

  ul {
    padding-top: 80px;
    li {
      margin-top: 15px;
      transition: 0.5s all ease-in-out;
      a {
        transition: 0.5s all ease-in-out;
        color: #eee;
        background-color: #343541;
        font-size: 16px;
        font-weight: 700;
        padding: 20px;
        padding-left: 30px;
        display: flex;
        grid-gap: 15px;
        align-items: center;
        .list_text {
          transition: 0.5s all ease-in-out;
          font-size: ${(properties) =>
            properties.toggleprop === "true" ? "0px" : "initial"};
        }
        &.active,
        &:hover {
          background-color: #157347;
          border-top-right-radius: 30px;
          border-bottom-right-radius: 30px;
        }
      }
    }
  }
`;
export const LoginFormContainer = styled.div`
  background-color: #343541;
  height: 70%;
  width: 30%;
  border: 1px solid #555561;
  border-radius: 15px;
  Form {
    .form_heading {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #555561;
      padding: 15px;
      margin-bottom: 20px;
      h1 {
        color: #eeeeee;
        font-size: 30px;
        font-weight: 700;
        text-align: center;
      }
    }
    .lable_error_wrap {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      margin: 0px;
      padding: 0px;
      .error-message {
        margin: 0px;
        padding: 0px;
      }
    }
    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      padding-right: 20px;
      margin-bottom: 20px;
      grid-gap: 5px;
      input {
        width: 100%;

        &:focus {
          border-color: #555561 !important;
        }
      }
      label {
        color: #eeeeee;
      }
      button {
        border-radius: 5px;
        margin-top: 20px;
      }
    }
  }
`;
export const SplashContainer = styled.div`
  /* background-image: url("/images/bg1.jpg");
  background-size: cover;
  background-position: center; */
  background-color: #000000;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  align-items: center;
  justify-content: center;
  .splash_card {
    a {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
    }
    border: 2px solid black;
    height: 70px;
    width: 150px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: ${(properties) =>
      !properties.color ? properties.color : "#ffffff90"};
  color: ${(properties) =>
      properties.color ? properties.color : "lightgray"}; */
    &:hover {
      border-color: white;
      background-color: tomato;
      color: white;
    }
  }
`;
// export const myDiv = styled.div``;
export const SpalshCard = styled.div`
  background-color: ${(properties) =>
    !properties.color ? properties.color : "#ffffff90"};
  color: ${(properties) => (properties.color ? properties.color : "lightgray")};
  width: ${(properties) => properties.cardWidth && properties.cardWidth};
  transition: 0.3s all ease-in-out;
`;

export default GlobalStyles;
