import axios from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import { useSignOut} from "react-auth-kit";
import {Link, useNavigate} from "react-router-dom";
import { Container } from "../commons";

function Home() {
  const navigate = useNavigate()
  const redirect = () => {
    navigate("/books")
  }
  return (
      {redirect}
  );
}

export { Home };
