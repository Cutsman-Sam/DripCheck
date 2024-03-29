import React from 'react';
import styled from 'styled-components/native';

export const Post = styled.View`
  flex: 1;
  align-content: center;
  background-color: #fff;
  padding: 30px;
`;

export const Card = styled.View`
  background-color: #f8f8f8;
  width: 100%
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const UserInfoText = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const PostTime = styled.Text`
    font-size: 12px;
    color: #666; 
`;

export const PostText = styled.Text`
  font-size: 14px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const PostImg = styled.Image`
  width: 100%;
  height: 350px;
  margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
`;

export const Interaction = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
  padding: 2px 5px;
  background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
`;

export const InteractionText = styled.Text`
  font-size: 12px;
  font-weigth: bold;
  color: ${props => props.active ? '#2e64e5' : '#333'};
  margin-top: 5px;
  margin-left: 5px;
`;

export const ContentFilter = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px;
`;