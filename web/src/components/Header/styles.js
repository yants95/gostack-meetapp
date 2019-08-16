import styled from 'styled-components';

export const Container = styled.div`
    background: #fff;
    padding: 0 30px;
`;

export const Content = styled.div`
    height: 64px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    nav {
        display: flex;
        align-items: center;

        img {
            height: 32px;
            width: 31px;
        }

        a {
            font-weight: bold;
            color: #f84d6d;
        }
    }

    aside {
        display: flex;
        align-items: center;

        button {
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            line-height: 20px;
            background: #f84d6d;
            border-radius: 4px;
            border: 0;
            height: 42px;
            width: 71px;
            margin-left: 20px;
        }
    }
`;

export const Profile = styled.div`
    display: flex;

    div {
        text-align: right;
        margin-right: 10px;

        strong {
            display: block;
            color: #984cc7;
            font-weight: bold;
            line-height: 18px;
            font-size: 14px;
        }

        a {
            display: block;
            margin-top: 2px;
            line-height: 18px;
            font-size: 14px;
            color: #999;
        }
    }
`;
