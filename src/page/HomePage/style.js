import styled from "styled-components";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";

export const WapperTypeProduct = styled.div`
    display: flex;
    align-item: center;
    gap: 32px;
    justify-content: flex-start;
    height: 35px;
`
export const WapperButtonMore = styled(ButtonComponent)`
    &:hover{
        color: #fff;
        background: rgb(13, 92, 182)
        span{
            color: red;
        }
    }
`
export const WapperProduct = styled.div`
    margin-top: 30px;
    display: flex;
    gap: 17px;
    flex-wrap: wrap
`