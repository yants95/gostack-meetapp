import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
    height: 100%;
    min-height: 100vh;
    background: linear-gradient(180deg, #ffffff 0%, #c3a9d4 100%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 315px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            background: #ffffff;
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #000;
            margin: 0 0 10px;
            font-weight: bold;

            &::placeholder {
                color: #000;
            }
        }

        span {
            color: #000;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            background: #984cc7;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.03, '#984cc7')};
            }
        }

        a {
            color: #984cc7;
            margin-top: 15px;
            font-size: 16px;
            opacity: 0.8;
            font-weight: bold;

            &:hover {
                opacity: 1;
            }
        }
    }
`;
