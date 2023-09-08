import styled from "styled-components";

export const Table = styled.div`
  display: flex;
  margin: 50px 30%;
  > table,
  tr,
  td {
    text-align: center;
    border: 1px solid black;
    width: 100px;
  }

  > table {
    border-collapse: collapse;
   
    width: 100%;
  }
  
`;
