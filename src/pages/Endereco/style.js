import styled from "styled-components";

export const Container = styled.div`
    background: #d3d3d3;
    color: black;
    display: flex;
    margin: 50px 50px;
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
`;
