import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 20px 0 30px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #984cc7;
    font-weight: bold;
    align-self: center;
    margin-top: 30px;
`;

export const Form = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { padding: 30 },
})`
    align-self: stretch;
`;

export const FormInput = styled(Input)`
    margin-bottom: 10px;
    background-color: #fff;
`;

export const SubmitButton = styled(Button)`
    margin-top: 5px;
    background: #4d9936;
`;

export const LogoutButton = styled(Button)`
    margin-top: 10px;
    height: 42px;
    background: #d44059;
`;
