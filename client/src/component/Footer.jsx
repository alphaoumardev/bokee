import { Link } from "react-router-dom";
import logo from "./../img/log.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="left">
        <img src={logo} alt="Shaheb 10" width={30} />
        copyright&copy; 2022,
        <a
          className="link"
          href="https://www.github.com/alphaoumardev"
          target={"_blank"}
          rel="noopener noreferrer"
        >
          Alpha
        </a>
      </div>
      <div className="right">
        Made with love and Full Stack ( <b>Reactjs, Expressjs, MySql</b> ) Blog
      </div>
    </footer>
  );
}

export default Footer;
