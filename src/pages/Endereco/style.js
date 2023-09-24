import styled from "styled-components";

export const Container = styled.div`
    background: #d3d3d3;
    color: black;
    display: flex;
    margin: 50px 50px;
    border-radius: 10px;

    > table {
        border-collapse: collapse;
        width: 100%;
        text-align: left;

        > tr,
        th {
            padding: 10px;
        }
        > th,
        td {
            text-align: left;
            padding: 8px;
        }

        > tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    }

    .edit {
        color: lightskyblue;
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
