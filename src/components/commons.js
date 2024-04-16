import { Input } from "baseui/input";
import styled from "styled-components";
import {Link} from "react-router-dom";


export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
    
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 4rem;
  margin: 5rem;  
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(15, 15, 15, 0.6);
  background-color: #1c1c1c;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1.2rem 0;
`;

export const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 20em !important;
`;

export const ErrorText = styled.span`
  color: #eb5d5d;
  font-size: 18px;
  margin: 10px 0;
`;

export const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
    margin: 1rem;
    position: relative;
    display: block;
`
