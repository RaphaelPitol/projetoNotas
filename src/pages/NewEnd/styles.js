import styled from "styled-components";

export const Container = styled.div`
    .form {
        display: flex;
        flex-direction: column;
        width: 450px;
        border-radius: 5px;
    }

    .form label:nth-of-type(n + 2) {
        margin-top: 20px; /* ou a quantidade desejada */
    }
    .form input {
        font-size: 20px;
        max-width: 450px;
        min-width: 100px;
        border-radius: 5px;
        border: none;
        padding-left: 5px;
    }
    .estado {
        border: none;
        border-radius: 5px;
        font-size: 20px;
        max-width: 100px;
        padding-left: 5px;
    }
    .user {
        border: none;
        border-radius: 5px;
        font-size: 20px;
        max-width: 450px;
        padding-left: 5px;
    }
    #cep {
        border-radius: 5px;
        border: none;
        text-align: center;
        max-width: 140px;
        padding-left: 5px;
    }
    button {
        max-width: 130px;
        max-height: 40px;
    }
    .divForm {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
            rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
            rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        /* box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px; */
        width: 600px;
        border-radius: 10px;
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
        align-items: center;
        margin: 10px auto;
        justify-content: space-around;
    }

    .divButton {
        margin-top: 15px;
        display: flex;
        justify-content: center;
    }
`;
