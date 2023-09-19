import { styled } from "styled-components";

export const Container = styled.div`
 >div{
  margin: 0 200px;
  color: white;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
 } 
`;

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  > label {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    font-size: 1.5rem;
    > input {
      padding-left: 10px;
      height: 50px;
      border-radius: 10px;
      border: none;
      font-size: 1.5rem;
    }
    >span {
    color: red;
    margin-top: 79px;
    font-size: 16px;
    position: absolute;
  }
  }
  > select {
    margin-top: 10px;
    padding-left: 10px;
    height: 50px;
    border-radius: 10px;
    border: none;
    font-size: 1.5rem;
    
  }

  > button {
    width: 150px;
    height: 50px;
    margin: 20px auto;
    border-radius: 10px;
    border: none;
    background: orange;
    font-size: 1.2rem;
  }
  > span {
    color: red;
    margin-top: 347px;
    font-size: 16px;
    position: absolute;
  }
`;
