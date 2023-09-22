import styled from "styled-components";

export const Container = styled.div`
background: #552233;
color: black;
display: flex;
margin: 50px 50px;
border-radius: 10px;

>table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
    
    >th, td {
        text-align: left;
        padding: 8px;
    }
    
    >tr:nth-child(even){background-color: #f2f2f2}
}



`