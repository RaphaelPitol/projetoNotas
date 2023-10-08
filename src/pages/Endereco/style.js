import styled from "styled-components";

export const Container = styled.div`
    background: #d3d3d3;
    color: black;
    display: flex;
    margin: 0px 50px 20px;
    border-radius: 10px;
    overflow: hidden;

    > table {
        border-collapse: collapse;
        width: 100%;

        th,
        td {
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        th {
            background-color: #4caf50;
            color: white;
        }
    }

    .edit {
        color: #677e8d;
        background: none;
        border: none;
        margin-right: 10px;
        font-size: 1.5rem;
    }
    .delete {
        background: none;
        border: none;
        color: darkorange;
        margin-left: 10px;
        font-size: 1.5rem;
    }

    .page {
        color: white;
        background-color: var(BACKGROUND_700);
        position: absolute;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 5px;
        margin-left: 70%;
        border-radius: 5px;
        button{
            border-radius: 5px;
            background:  #4caf50;
            border: none;
            margin: 0 2px;
            padding: 5px;

        }
    }
`;

export const FormBusca = styled.div`
    margin: 1.5rem 5rem ;
    font-size: 1.5rem;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;


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
    h3{
        text-align: center;
        margin-bottom: 1rem;
    }
`;
