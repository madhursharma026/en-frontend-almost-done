import { gql } from '@apollo/client';


export const roomConnectingToOther = gql`
query Query($myToken: String!) {
  roomConnectingToOther(myToken: $myToken) {
    id
    roomName
    participants
    firstParticipantToken
    secondParticipantToken
    createdAt
  }
}
`

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      firstName
      lastName
      age
      mobileNumber
      verified
      level
      totalTalks
      createdAt
      updatedAt
      teachingClasses {
        id
        title
        startsAt
        description
        teacherId
        createdAt
        updatedAt
        usersJoined {
          id
          firstName
          lastName
          age
          mobileNumber
          verified
          level
          totalTalks
          createdAt
          updatedAt
        }
        teacher {
          id
          firstName
          lastName
          age
          mobileNumber
          verified
          createdAt
          updatedAt
        }
      }
      conversationsStarted {
        id
        isWaiting
        createdAt
        updatedAt
        conversationInitiator {
          id
          firstName
          lastName
          age
          mobileNumber
          verified
          level
          totalTalks
          createdAt
          updatedAt
        }
        conversationWith {
          id
          firstName
          lastName
          age
          mobileNumber
          verified
          level
          totalTalks
          createdAt
          updatedAt
        }
        isPair
      }
      conversationJoined {
        id
        isWaiting
        createdAt
        updatedAt
        isPair
      }
    }
  }
`;
