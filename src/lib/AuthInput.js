import styled from 'styled-components';


export const Input = styled.input.attrs(props => ({
    type: props.type ? props.type : 'text',
    size: props.size || "1em",
    placeholder : props.name === "email" ? "heesu@blog.com": props.name ,
  }))`
    color: palevioletred;
    font-size: ${props => props.size};
    border:2px solid white;
    border-radius: 10px;
    &:focus { outline:none;background-color: white; border : 2px solid rgba(13, 72, 50,.3) }
    &:hover { background-color: white; border : 2px solid rgba(13, 72, 50,.3)}
    width:${props => props.width || '55%' };
    background-color:rgba(13, 72, 50,.08);
    margin: ${props => props.size};
    padding: ${props => props.size};
    padding-left: ${props => props.padding}
    transition: border .6s;
  `;

  export const Button = styled.button`
   font-size: ${props => props.size || "1rem"};
   border-radius:20px;
   background-color:${props=> props.bgcolor || "rgb(13, 72, 50)"};
   border:none;
   color:${props => props.color || "white"};
   &:hover{ background-color:${props=> props.hover || "rgba(13, 72, 50,.8)"}};
   transition:.5s;
   width:${props => props.width || "100px"};
   height:${props => props.height || "30px"};
  `