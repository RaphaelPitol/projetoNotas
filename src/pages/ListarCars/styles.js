import styled from "styled-components";

export const Table = styled.div`
  display: flex;
  margin: 50px 30%;
  flex-direction:column;
  text-align: center;
  > table,
  tr,
  td {
    text-align: center;
    border: 1px solid black;
    width: 150px;
  }

  > table {
    border-collapse: collapse;
    font-size: 20px;
    width: 100%;
    background: #303030;

  }
  .edit{
    color: #005555;
    background: none;
    border: none;
    margin-right: 5px;
    font-size: 1.5rem;
  }
  .delete{
    background: none;
    border: none;
    color: #880000;
    margin-left: 5px;
    font-size: 1.5rem;
  }
  
`;
