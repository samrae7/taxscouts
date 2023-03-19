import styled from 'styled-components';

export const TextInput = styled.input`
    position: absolute;
    width: 238px;
    height: 42px;
    right: 12px;
    top: 9px;
    background: #e3e3e3;
    border-radius: 2px;
    border: 0px;
    padding: 18px 12px;
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.main};
`;
