import styled from "styled-components";

export const Conatiner = styled.div`
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    width: 81.5vw;
    background: white;
    border-radius: 10px;
`;


export const FormBusca = styled.div`
    margin: 1.5rem 5rem;
    font-size: 1.5rem;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;

    form {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        flex-direction: row;
        gap: 8px;
    }
    input {
        width: 180px;
        border-radius: 10px;
        border: none;
        padding-left: 10px;
    }
    button {
        background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        border: none;
        border-radius: 15px;
        font-size: 1.5rem;
        color: white;
    }
    h3 {
        text-align: center;
        margin-bottom: 1rem;
    }
`;
