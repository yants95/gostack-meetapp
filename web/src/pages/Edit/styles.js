import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 940px;
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
                color: rgba(255, 255, 255, 0.5);
            }
        }

        textarea {
            background: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 18px;
            line-height: 23px;
            height: 200px;
            padding: 20px;
            color: #000;
            margin: 0 0 10px;

            &::placeholder {
                color: #fff;
            }
        }

        div.div_with_btn {
            align-self: flex-end;

            .edit_btn {
                margin: 5px 0 0;
                height: 42px;
                width: 162px;
                background: #4d9936;
                border: 0;
                border-radius: 4px;
                font-size: 16px;
                transition: background 0.2s;

                &:hover {
                    background: ${darken(0.03, '#4d9936')};
                }

                div {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    span {
                        color: #fff;
                        margin-left: 10px;
                        font-weight: bold;
                        font-size: 16px;
                    }
                }
            }
        }

        .react-datepicker__input-container {
            display: flex;
            align-self: stretch;
            width: 100%;

            > input {
                width: 100%;
            }
        }
    }
`;
