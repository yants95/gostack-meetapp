import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: #fff;
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #000;
            margin: 0 0 10px;
            font-size: 18px;
            line-height: 23px;

            &::placeholder {
                color: #000;
            }
        }

        > span {
            color: #984cc7;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        hr {
            border: 0;
            height: 1px;
            background: rgba(255, 255, 255, 0.2);
            margin: 10px 0 20px;
        }

        > button {
            display: flex;
            align-items: center;
            justify-content: center;

            align-self: flex-end;
            margin: 5px 0 0;
            height: 42px;
            width: 100px;
            background: #4d9936;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.03, '#4d9936')};
            }

            > span {
                color: #fff;
                margin-left: 10px;
                font-weight: bold;
                font-size: 16px;
                line-height: 20px;
            }
        }
    }
`;
